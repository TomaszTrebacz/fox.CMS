import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  hasFormErrors() {
    return !this.loginForm.valid;
  }

  fieldErrors(field: string) {
    let controlState = this.loginForm.controls[field];
    return controlState.dirty && controlState.errors
      ? controlState.errors
      : null;
  }

  onSubmit() {
    console.log(this.loginForm.value.email);
    const input = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log(input);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(map((token) => this.router.navigateByUrl('/users/account')))
      .subscribe();
  }
}

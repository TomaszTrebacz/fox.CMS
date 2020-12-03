import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  numberPattern = '^[+][0-9]*$';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      phoneNumber: ['', [Validators.pattern(this.numberPattern)]],
    });
  }

  hasFormErrors() {
    return !this.registerForm.valid;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully registered!',
            detail: `You have to confirm your account by clicking link sent on email!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Can not register user',
            detail: error,
          });
        },
      });
  }
}

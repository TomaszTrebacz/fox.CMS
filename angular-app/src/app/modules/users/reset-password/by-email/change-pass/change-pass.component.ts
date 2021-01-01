import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  form: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      token: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ]
    });

    this.form.patchValue({
      token: this.route.snapshot.queryParams['token']
    });

    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
  }

  onSubmit() {
    this.authService
      .changePassByToken(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/users/login');
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Successfully changed!',
            detail: 'Now you can log in'
          });
        },
        error: error => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error! :(',
            detail: `Password was not changed: ${error}`
          });
        }
      });
  }
}

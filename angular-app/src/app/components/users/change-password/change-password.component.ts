import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  onSubmit() {
    this.authService
      .changePassword(this.form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Successfully changed!',
            detail: 'Now you have to use your new password!',
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error! :(',
            detail: `Password was not changed: ${error}`,
          });
        },
      });
  }
}

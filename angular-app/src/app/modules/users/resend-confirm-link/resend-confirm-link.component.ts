import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-resend-confirm-link',
  templateUrl: './resend-confirm-link.component.html',
  styleUrls: ['./resend-confirm-link.component.css'],
})
export class ResendConfirmLinkComponent implements OnInit {
  form: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
    });
  }

  hasFormErrors() {
    return !this.form.valid;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .changeConfirmToken(this.form.value.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Email with new link was send.',
            detail: 'Please confirm your account!',
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error!',
            detail: error,
          });
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  phoneForm: FormGroup;
  error = '';
  numberPattern = '^[+][0-9]*$';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.pattern(this.numberPattern)]],
    });
  }

  hasFormErrors() {
    return !this.phoneForm.valid;
  }

  onPhoneFormSubmit() {
    if (this.phoneForm.invalid) {
      return;
    }

    this.authService
      .sendCodePhone(this.phoneForm.value.phoneNumber)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Code sent!',
            detail: 'Please check your phone!',
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Code was not send',
            detail: error,
          });
        },
      });
  }
}

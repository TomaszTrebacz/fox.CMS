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
  selector: 'app-by-email',
  templateUrl: './by-email.component.html',
  styleUrls: ['./by-email.component.css'],
})
export class ByEmailComponent implements OnInit {
  emailForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
    });
  }

  onEmailFormSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    this.authService
      .sendChangePassEmail(this.emailForm.value.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Successfully sent!',
            detail: 'Please check your inbox',
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error! :(',
            detail: `Email was not sent: ${error}`,
          });
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Loading } from 'src/app/core/enums/loading.enum';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['./confirmation-code.component.css'],
})
export class ConfirmationCodeComponent implements OnInit {
  codeForm: FormGroup;
  error: '';
  numberPattern: '^[+][0-9]*$';
  Loading = Loading;
  loading = Loading.false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.codeForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.numberPattern)],
      ],
      code: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  onConfirmSubmit(): void {
    if (this.codeForm.invalid) {
      return;
    }

    this.loading = Loading.true;

    this.codeForm.patchValue({
      code: +this.codeForm.value.code,
    });

    this.authService
      .resetPassword(this.codeForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = Loading.false;
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Password reset & send by SMS!',
            detail: 'Please check your phone!',
          });
        },
        error: (error) => {
          this.loading = Loading.false;
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Password was not reset',
            detail: error,
          });
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  form: FormGroup;
  error: '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ]
    });
  }

  hasFormErrors() {
    return !this.form.valid;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

    this.userService
      .updateUser(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/users/account');
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully edited!',
            detail: `Your account data was edited.`
          });
        },
        error: error => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Can not edit data',
            detail: error.message
          });
        }
      });
  }
}

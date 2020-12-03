import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css'],
})
export class ConfirmAccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];

    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.authService
      .confirmUser(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/users/login');
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Successfully confirmed!',
            detail: 'Now you can log in',
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error! :(',
            detail: `Account was not confirmed: ${error}`,
          });
        },
      });
  }
}

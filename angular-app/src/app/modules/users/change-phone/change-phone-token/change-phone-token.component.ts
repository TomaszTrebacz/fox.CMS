import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-change-phone-token',
  templateUrl: './change-phone-token.component.html',
  styleUrls: ['./change-phone-token.component.css']
})
export class ChangePhoneTokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];

    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.userService
      .changePhoneNumber(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/users/login');
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'success',
            summary: 'Successfully changed!',
            detail: 'Your phone number was changed'
          });
        },
        error: error => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error! :(',
            detail: `Phone number was not changed: ${error.message}`
          });
        }
      });
  }
}

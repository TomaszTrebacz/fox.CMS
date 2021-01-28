import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
}

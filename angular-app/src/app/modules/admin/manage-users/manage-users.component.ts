import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().then((users) => (this.users = users));
  }
}

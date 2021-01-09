import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { userRole } from '../../enums';
import { User } from '../../models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  user: User | any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.userValue;

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: '/',
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }

  toAccount() {
    this.router.navigate(['users/account']);
  }

  toWorkboard() {
    if (this.user.role === userRole.ADMIN || this.user.role === userRole.ROOT) {
      this.router.navigate(['admin/workboard']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: '/',
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-pencil',
        url: 'blog',
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-key',
        url: '/users/login',
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-key',
        url: '/users/register',
      },
    ];

    // highlight menu item
    const route = this.items.find((x) => x.url === this.location.path());

    if (route === undefined) {
      this.activeItem = this.items[0];
    } else {
      this.activeItem = route;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }
}

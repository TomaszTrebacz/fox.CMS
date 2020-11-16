import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

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
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: '/'
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-pencil',
        url: 'blog'
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-key',
        url: '/users/login'
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-key',
        url: '/users/register'
      }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }
}

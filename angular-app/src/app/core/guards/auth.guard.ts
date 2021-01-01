import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;

    if (user) {
      if (route.data.roles && !route.data.roles.includes(user.role)) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.authService.logout();
    this.router.navigate(['/users/login']);
    return false;
  }
}

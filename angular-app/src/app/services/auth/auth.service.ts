import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginGQL } from 'src/app/graphql/login.query';
import { User } from 'src/app/interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginForm {
  email: string;
  password: string;
}

export interface jwtResponse {
  role: string;
  valid: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt = new JwtHelperService();

  constructor(private loginGQL: LoginGQL) {}

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          localStorage.setItem('accesstoken', result.data.login.token);
        })
      );
  }

  isAuthenticated(): jwtResponse {
    const token = localStorage.getItem('accesstoken');
    if (!token) return null;

    const decodedToken = this.jwt.decodeToken(token);

    const response = {
      role: decodedToken.role,
      valid: !this.jwt.isTokenExpired(token),
    };

    return response;
  }

  logout() {
    localStorage.removeItem('accesstoken');
  }
}

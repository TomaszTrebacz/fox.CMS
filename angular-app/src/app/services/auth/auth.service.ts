import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginGQL } from 'src/app/graphql/login.query';

export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private loginGQL: LoginGQL) {
    if (localStorage.getItem('accesstoken')) this.isAuthenticated.next(true);
    else this.isAuthenticated.next(false);
  }

  isLogged(): boolean {
    return this.isAuthenticated.getValue();
  }

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          localStorage.setItem('accesstoken', result.data.login.token);
          this.isAuthenticated.next(true);
          return result.data.login.token;
        })
      );
  }

  logout() {
    localStorage.removeItem('accesstoken');
    this.isAuthenticated.next(false);
  }
}

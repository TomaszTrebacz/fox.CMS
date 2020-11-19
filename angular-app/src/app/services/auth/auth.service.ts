import { Injectable, Input } from '@angular/core';
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
  constructor(private loginGQL: LoginGQL) {}

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          localStorage.setItem('accesstoken', result.data.login.token);
          return result.data.login.token;
        })
      );
  }
}

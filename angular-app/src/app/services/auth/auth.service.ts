import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginGQL } from 'src/app/graphql/login.query';
import { decrypt, encrypt } from 'src/app/helpers/crypto';

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
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private loginGQL: LoginGQL) {
    let userValue = localStorage.getItem('user');

    if (userValue) {
      this.userSubject = new BehaviorSubject(JSON.parse(decrypt(userValue)));
    } else {
      this.userSubject = new BehaviorSubject(null);
    }

    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          const encryptedAccessToken = encrypt(result.data.login.token);

          const user = {
            ...result.data.login.user,
            role: result.data.login.role,
          };

          let encryptedUser = encrypt(JSON.stringify(user));

          localStorage.setItem('accesstoken', encryptedAccessToken);
          localStorage.setItem('user', encryptedUser);

          this.userSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('accesstoken');
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}

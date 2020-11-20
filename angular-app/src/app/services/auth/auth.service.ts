import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginGQL } from 'src/app/graphql/login.query';
import { User } from 'src/app/interfaces/user.interface';

export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: BehaviorSubject<User>;
  user: Observable<User | null>;

  constructor(private loginGQL: LoginGQL) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  get userValue(): User {
    return this.userSubject.value;
  }

  login(credentials: LoginForm) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          localStorage.setItem('accesstoken', result.data.login.token);

          const user = {
            ...result.data.login.user,
            role: result.data.login.role,
          };

          this.userSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('accesstoken');
    this.userSubject.next(null);
  }
}

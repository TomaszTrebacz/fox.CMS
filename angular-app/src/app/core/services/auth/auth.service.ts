import { Injectable, Input, ɵConsole } from '@angular/core';
import { ObservableQuery } from '@apollo/client/core';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ChangeConfirmTokenGQL,
  ChangePassByTokenGQL,
  ChangePassByTokenI,
  ChangePasswordGQL,
  ConfirmUserGQL,
  LoginGQL,
  LogoutGQL,
  ResetPasswordGQL,
  SendChangePassEmailGQL,
  SendCodePhoneGQL,
  ChangeRoleGQL,
  ChangeRoleI,
  ResetFormI,
} from 'src/app/core/graphql';
import { AccessToken, RefreshToken, UserStorage } from 'src/app/core/storage';
import { User } from '../../models';

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

  @AccessToken() private accessToken: string;
  @RefreshToken() private refreshToken: string;
  @UserStorage() private userStorage: string;

  constructor(
    private loginGQL: LoginGQL,
    private logoutGQL: LogoutGQL,
    private confirmUserGQL: ConfirmUserGQL,
    private changeConfirmTokenGQL: ChangeConfirmTokenGQL,
    private sendCodePhoneGQL: SendCodePhoneGQL,
    private resetPasswordGQL: ResetPasswordGQL,
    private changePassByTokenGQL: ChangePassByTokenGQL,
    private sendChangePassEmailGQL: SendChangePassEmailGQL,
    private changePasswordGQL: ChangePasswordGQL,
    private changeRoleGQL: ChangeRoleGQL
  ) {
    this.userSubject = new BehaviorSubject(this.userStorage || null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get userRole() {
    return this.userSubject.value.role;
  }

  login(credentials: Pick<User, 'email' | 'password'>) {
    return this.loginGQL
      .fetch({
        input: credentials,
      })
      .pipe(
        map((result) => {
          const user = {
            ...result.data.login.user,
            role: result.data.login.role,
          };

          this.accessToken = result.data.login.accessToken;
          this.refreshToken = result.data.login.refreshToken;
          this.userStorage = user;

          this.userSubject.next(user);
        })
      );
  }

  logout() {
    const { id } = this.userValue;
    this.logoutGQL.mutate({ id: id });

    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('user');

    this.userSubject.next(null);
  }

  confirmUser(token: string): Observable<boolean> {
    return this.confirmUserGQL
      .mutate({ token: token })
      .pipe(map((res) => res.data));
  }

  sendCodePhone(phoneNumber: string): Observable<boolean> {
    return this.sendCodePhoneGQL
      .mutate({ phoneNumber: phoneNumber })
      .pipe(map((res) => res.data));
  }

  changeConfirmToken(email: string): Observable<boolean> {
    return this.changeConfirmTokenGQL
      .mutate({ email: email })
      .pipe(map((res) => res.data));
  }

  resetPassword(input: ResetFormI): Observable<boolean> {
    return this.resetPasswordGQL
      .mutate({ input: input })
      .pipe(map((res) => res.data));
  }

  sendChangePassEmail(email: string): Observable<boolean> {
    return this.sendChangePassEmailGQL
      .mutate({ email: email })
      .pipe(map((res) => res.data));
  }

  changePassByToken(input: ChangePassByTokenI): Observable<boolean> {
    return this.changePassByTokenGQL
      .mutate({ input: input })
      .pipe(map((res) => res.data));
  }

  changePassword(password: string): Observable<boolean> {
    return this.changePasswordGQL
      .mutate({ password: password })
      .pipe(map((res) => res.data));
  }

  changeRole(input: Pick<User, 'id' | 'role'>): Observable<boolean> {
    return this.changeRoleGQL
      .mutate({ input: input })
      .pipe(map((result) => result.data));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  ResetFormI,
} from 'src/app/core/graphql';
import { AccessToken, RefreshToken, UserStorage } from 'src/app/core/storage';
import { userRole } from '../../enums';
import { User } from '../../models';

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

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get userRole(): userRole {
    return this.userSubject.value.role;
  }

  login(input: Pick<User, 'email' | 'password'>): Observable<void> {
    return this.loginGQL.fetch({ input }).pipe(
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

  logout(): void {
    const { id } = this.userValue;
    this.logoutGQL.mutate({ id });

    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('user');

    this.userSubject.next(null);
  }

  confirmUser(token: string): Observable<boolean> {
    return this.confirmUserGQL.mutate({ token }).pipe(map((res) => res.data));
  }

  sendCodePhone(phoneNumber: string): Observable<boolean> {
    return this.sendCodePhoneGQL
      .mutate({ phoneNumber })
      .pipe(map((res) => res.data));
  }

  changeConfirmToken(email: string): Observable<boolean> {
    return this.changeConfirmTokenGQL
      .mutate({ email })
      .pipe(map((res) => res.data));
  }

  resetPassword(input: ResetFormI): Observable<boolean> {
    return this.resetPasswordGQL.mutate({ input }).pipe(map((res) => res.data));
  }

  sendChangePassEmail(email: string): Observable<boolean> {
    return this.sendChangePassEmailGQL
      .mutate({ email })
      .pipe(map((res) => res.data));
  }

  changePassByToken(input: ChangePassByTokenI): Observable<boolean> {
    return this.changePassByTokenGQL
      .mutate({ input })
      .pipe(map((res) => res.data));
  }

  changePassword(password: string): Observable<boolean> {
    return this.changePasswordGQL
      .mutate({ password })
      .pipe(map((res) => res.data));
  }

  changeRole(input: Pick<User, 'id' | 'role'>): Observable<boolean> {
    return this.changeRoleGQL
      .mutate({ input })
      .pipe(map((result) => result.data));
  }
}

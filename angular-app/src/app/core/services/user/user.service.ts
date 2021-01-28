import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ChangePhoneNumberGQL,
  CurrentUserSQL,
  DeleteUserGQL,
  RegisterGQL,
  SendChangePhoneEmailGQL,
  UpdateUserGQL,
  UserGQL,
} from 'src/app/core/graphql';
import { User } from 'src/app/core/models';
import { UsersGQL } from '../../graphql/query/user/users.query';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userGQL: UserGQL,
    private currentUserSQL: CurrentUserSQL,
    private registerGQL: RegisterGQL,
    private updateUserGQL: UpdateUserGQL,
    private sendChangePhoneEmailGQL: SendChangePhoneEmailGQL,
    private changePhoneNumberGQL: ChangePhoneNumberGQL,
    private deleteUserGQL: DeleteUserGQL,
    private usersGQL: UsersGQL
  ) {}

  getUser(id: string): Observable<User> {
    return this.userGQL
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.user));
  }

  getUsers(): Promise<User[]> {
    return this.usersGQL
      .fetch()
      .toPromise()
      .then((res) => res.data.users);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.currentUser));
  }

  register(
    input: Pick<
      User,
      'email' | 'password' | 'firstName' | 'lastName' | 'phoneNumber'
    >
  ): Observable<User> {
    return this.registerGQL
      .mutate({ input })
      .pipe(map((result) => result.data));
  }

  updateUser(input: Pick<User, 'firstName' | 'lastName'>): Observable<boolean> {
    return this.updateUserGQL.mutate({ input }).pipe(map((res) => res.data));
  }

  sendChangePhoneEmail(phoneNumber: string): Observable<boolean> {
    return this.sendChangePhoneEmailGQL
      .mutate({ phoneNumber })
      .pipe(map((res) => res.data));
  }

  changePhoneNumber(token: string): Observable<boolean> {
    return this.changePhoneNumberGQL
      .mutate({ token })
      .pipe(map((res) => res.data));
  }

  deleteUser(id: string): Observable<boolean> {
    return this.deleteUserGQL.mutate({ id }).pipe(map((res) => res.data));
  }
}

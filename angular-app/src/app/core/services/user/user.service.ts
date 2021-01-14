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

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateUserForm {
  firstName: string;
  lastName: string;
}

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
    private deleteUserGQL: DeleteUserGQL
  ) {}

  getUser(id: string): Observable<User> {
    return this.userGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.user));
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSQL
      .fetch()
      .pipe(map((result) => result.data.currentUser));
  }

  register(credentials: RegisterForm): Observable<any> {
    return this.registerGQL.mutate({
      input: credentials,
    });
  }

  updateUser(input: UpdateUserForm): Observable<any> {
    return this.updateUserGQL.mutate({ input: input });
  }

  sendChangePhoneEmail(phoneNumber: string): Observable<any> {
    return this.sendChangePhoneEmailGQL.mutate({
      phoneNumber: phoneNumber,
    });
  }

  changePhoneNumber(token: string): Observable<any> {
    return this.changePhoneNumberGQL.mutate({
      token: token,
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.deleteUserGQL.mutate({ id: id });
  }
}

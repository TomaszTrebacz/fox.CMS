import { Injectable } from '@angular/core';
import { CurrentUserSQL } from 'src/app/graphql/currentUser.query';
import { User } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RegisterGQL } from 'src/app/graphql/register.mutation';
import { UpdateUserGQL } from 'src/app/graphql/updateUser.mutation';

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
  providedIn: 'root'
})
export class UserService {
  constructor(
    private currentUserSQL: CurrentUserSQL,
    private registerGQL: RegisterGQL,
    private updateUserGQL: UpdateUserGQL
  ) {}

  getCurrentUser(): Observable<User> {
    return this.currentUserSQL
      .fetch()
      .pipe(map(result => result.data.currentUser));
  }

  register(credentials: RegisterForm): Observable<any> {
    return this.registerGQL.mutate({
      input: credentials
    });
  }

  updateUser(input: UpdateUserForm): Observable<any> {
    return this.updateUserGQL.mutate({ input: input });
  }
}

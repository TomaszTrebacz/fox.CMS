import { Injectable } from '@angular/core';
import { CurrentUserSQL } from 'src/app/graphql/currentUser.query';
import { User } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private currentUserSQL: CurrentUserSQL) {}

  getCurrentUser(): Observable<User> {
    return this.currentUserSQL
      .fetch()
      .pipe(map((result) => result.data.currentUser));
  }
}

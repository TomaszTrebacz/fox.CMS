import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../../../models/post.interface';
import { User } from '../../../models/user.interface';
import { FullName } from '../../fragments';

export interface CurrentUser {
  currentUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentUserSQL extends Query<CurrentUser> {
  document = gql`
    query {
      currentUser {
        id
        email
        ...FullName
        phoneNumber
        created
        updated
      }
    }

    ${FullName}
  `;
}

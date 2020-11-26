import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

export interface Response {
  currentUser: User;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentUserSQL extends Query<Response> {
  document = gql`
    query {
      currentUser {
        id
        email
        firstName
        lastName
        phoneNumber
        created
        updated
      }
    }
  `;
}

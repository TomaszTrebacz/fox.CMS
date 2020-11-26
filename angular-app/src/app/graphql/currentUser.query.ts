import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';

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

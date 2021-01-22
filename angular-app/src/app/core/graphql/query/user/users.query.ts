import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UsersGQL extends Query<any> {
  document = gql`
    query {
      users {
        id
        email
        firstName
        lastName
        phoneNumber
        created
      }
    }
  `;
}

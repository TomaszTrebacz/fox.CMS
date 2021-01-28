import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { FullName } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class UsersGQL extends Query<any> {
  document = gql`
    query {
      users {
        id
        email
        ....FullName
        phoneNumber
        created
      }
    }

    ${FullName}
  `;
}

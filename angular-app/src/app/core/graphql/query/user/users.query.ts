import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { FullName } from '../../fragments';
import { User } from 'src/app/core/models';

interface UsersInterfaceI {
  users: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersGQL extends Query<UsersInterfaceI> {
  document = gql`
    query {
      users {
        id
        email
        ...FullName
        phoneNumber
        created
      }
    }

    ${FullName}
  `;
}

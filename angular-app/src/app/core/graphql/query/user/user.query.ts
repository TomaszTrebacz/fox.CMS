import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { User } from 'src/app/core/models';
import { FullName } from '../../fragments';

interface UserResponseI {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserGQL extends Query<UserResponseI> {
  document = gql`
    query($id: String!) {
      user(id: $id) {
        ...FullName
      }
    }

    ${FullName}
  `;
}

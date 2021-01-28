import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { User } from 'src/app/core/models';
import { FullName } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class UserGQL extends Query<any> {
  document = gql`
    query($id: String!) {
      user(id: $id) {
        ...FullName
      }
    }

    ${FullName}
  `;
}

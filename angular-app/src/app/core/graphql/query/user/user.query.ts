import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class UserGQL extends Query<any> {
  document = gql`
    query($id: String!) {
      user(id: $id) {
        firstName
        lastName
      }
    }
  `;
}

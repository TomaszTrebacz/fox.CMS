import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class PostGQL extends Query<any> {
  document = gql`
    query($id: Int!) {
      post(id: $id) {
        id
        title
        text
        created
        category {
          name
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  `;
}

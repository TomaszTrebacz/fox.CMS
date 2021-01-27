import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CategoryGQL extends Query<any> {
  document = gql`
    query($id: Int!) {
      category(id: $id) {
        id
        name
        posts {
          id
          title
          text
          imageUrl
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  `;
}

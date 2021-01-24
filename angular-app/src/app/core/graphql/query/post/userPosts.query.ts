import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserPostsGQL extends Query<any> {
  document = gql`
    query($id: String!) {
      userPosts(id: $id) {
        id
        title
        text
        imageUrl
        user {
          firstName
          lastName
        }
      }
    }
  `;
}

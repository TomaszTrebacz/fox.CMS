import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { FullName, PostContent } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class UserPostsGQL extends Query<any> {
  document = gql`
    query($id: String!) {
      userPosts(id: $id) {
        ...PostContent
        imageUrl
        user {
          ...FullName
        }
      }
    }

    ${PostContent}
    ${FullName}
  `;
}

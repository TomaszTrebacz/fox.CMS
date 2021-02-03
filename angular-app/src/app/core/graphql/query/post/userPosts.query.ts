import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from 'src/app/core/models';
import { FullName, PostContent } from '../../fragments';

export interface UserPostsResponseI {
  userPosts: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class UserPostsGQL extends Query<UserPostsResponseI> {
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

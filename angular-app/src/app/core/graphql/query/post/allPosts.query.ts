import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../../../models/post.interface';
import { FullName, PostContent } from '../../fragments';

export interface PostsResponseI {
  posts: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class AllPostsGQL extends Query<PostsResponseI> {
  document = gql`
    query {
      posts {
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

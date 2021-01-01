import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../../../models/post.interface';

export interface ResponseInterface {
  posts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class AllPostsGQL extends Query<ResponseInterface> {
  document = gql`
    query {
      posts {
        title
        text
        category {
          name
        }
        user {
          firstName
          lastName
        }
      }
    }
  `;
}

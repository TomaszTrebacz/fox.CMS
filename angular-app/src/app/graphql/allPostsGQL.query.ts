import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from '../models/post.interface';

export interface Response {
  posts: Post[];
}

@Injectable({
  providedIn: 'root',
})
export class AllPostsGQL extends Query<Response> {
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

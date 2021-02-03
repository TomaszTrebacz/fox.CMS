import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Post } from 'src/app/core/models';
import { CategoryContent, FullName, PostContent } from '../../fragments';

interface PostReponseI {
  post: Post;
}

@Injectable({
  providedIn: 'root',
})
export class PostGQL extends Query<PostReponseI> {
  document = gql`
    query($id: Int!) {
      post(id: $id) {
        ...PostContent
        created
        category {
          ...CategoryContent
        }
        user {
          id
          ...FullName
        }
      }
    }

    ${PostContent}
    ${FullName}
    ${CategoryContent}
  `;
}

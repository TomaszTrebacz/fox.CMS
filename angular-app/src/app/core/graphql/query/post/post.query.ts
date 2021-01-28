import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { CategoryContent, FullName, PostContent } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class PostGQL extends Query<any> {
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

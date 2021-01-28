import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { CategoryContent, FullName, PostContent } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class CategoryGQL extends Query<any> {
  document = gql`
    query($id: Int!) {
      category(id: $id) {
        ...CategoryContent
        posts {
          ...PostContent
          imageUrl
          user {
            id
            ...FullName
          }
        }
      }
    }

    ${CategoryContent}
    ${PostContent}
    ${FullName}
  `;
}

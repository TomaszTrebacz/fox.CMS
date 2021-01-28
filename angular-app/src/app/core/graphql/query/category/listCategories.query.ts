import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Category } from '../../../models/category.interface';
import { CategoryContent } from '../../fragments';

export interface Response {
  categories: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class ListCategoriesGQL extends Query<Response> {
  document = gql`
    query {
      categories {
        ...CategoryContent
      }
    }

    ${CategoryContent}
  `;
}

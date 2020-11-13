import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { Category } from '../interfaces/category.interface';

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
        name
      }
    }
  `;
}

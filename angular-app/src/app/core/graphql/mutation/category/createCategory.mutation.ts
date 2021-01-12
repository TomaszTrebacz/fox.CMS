import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryGQL extends Mutation {
  document = gql`
    mutation($input: CreateCategoryInput) {
      createCategory(createCategoryInput: $input) {
        id
      }
    }
  `;
}

import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class EditCategoryGQL extends Mutation {
  document = gql`
    mutation($input: EditCategoryInput) {
      editCategory(editCategoryInput: $input)
    }
  `;
}

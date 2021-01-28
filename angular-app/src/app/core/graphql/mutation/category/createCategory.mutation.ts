import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { Category } from 'src/app/core/models';

interface CreateCategoryResponseI {
  createCategory: Category;
}

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryGQL extends Mutation<CreateCategoryResponseI> {
  document = gql`
    mutation($input: CreateCategoryInput) {
      createCategory(createCategoryInput: $input) {
        id
      }
    }
  `;
}

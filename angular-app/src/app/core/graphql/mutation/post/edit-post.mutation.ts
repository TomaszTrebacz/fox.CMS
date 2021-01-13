import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class EditPostGQL extends Mutation {
  document = gql`
    mutation($input: EditPostInput) {
      editPost(editPostInput: $input)
    }
  `;
}

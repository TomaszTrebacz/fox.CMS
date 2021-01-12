import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CreatePostGQL extends Mutation {
  document = gql`
    mutation($input: CreatePostInput) {
      createPost(createPostInput: $input) {
        id
      }
    }
  `;
}

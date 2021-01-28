import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { Post } from 'src/app/core/models';

interface CreatePostResponseI {
  createPost: Post;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostGQL extends Mutation<CreatePostResponseI> {
  document = gql`
    mutation($input: CreatePostInput) {
      createPost(createPostInput: $input) {
        id
      }
    }
  `;
}

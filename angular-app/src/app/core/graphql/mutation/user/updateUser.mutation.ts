import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserGQL extends Mutation<boolean> {
  document = gql`
    mutation($input: UpdateUserInput) {
      updateUser(updateUserInput: $input)
    }
  `;
}

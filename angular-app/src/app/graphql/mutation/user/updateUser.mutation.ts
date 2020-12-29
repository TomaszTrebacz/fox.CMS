import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserGQL extends Mutation {
  document = gql`
    mutation($input: UpdateUserInput) {
      updateUser(updateUserInput: $input)
    }
  `;
}

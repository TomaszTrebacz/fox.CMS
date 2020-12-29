import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RegisterGQL extends Mutation {
  document = gql`
    mutation register($input: CreateUserInput) {
      registerUser(createUserInput: $input) {
        firstName
        lastName
      }
    }
  `;
}

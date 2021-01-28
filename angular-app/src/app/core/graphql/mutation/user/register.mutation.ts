import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterGQL extends Mutation<User> {
  document = gql`
    mutation register($input: CreateUserInput) {
      registerUser(createUserInput: $input) {
        firstName
        lastName
      }
    }
  `;
}

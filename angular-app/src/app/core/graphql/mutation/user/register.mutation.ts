import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { User } from 'src/app/core/models';
import { FullName } from '../../fragments';

@Injectable({
  providedIn: 'root',
})
export class RegisterGQL extends Mutation<User> {
  document = gql`
    mutation register($input: CreateUserInput) {
      registerUser(createUserInput: $input) {
        ...FullName
      }
    }

    ${FullName}
  `;
}

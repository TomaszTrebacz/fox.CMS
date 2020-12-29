import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordGQL extends Mutation {
  document = gql`
    mutation($input: ResetPasswordInput) {
      resetPassword(resetPasswordInput: $input)
    }
  `;
}

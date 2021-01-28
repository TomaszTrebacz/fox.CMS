import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

export interface ResetFormI {
  code: number;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordGQL extends Mutation<boolean> {
  document = gql`
    mutation($input: ResetPasswordInput) {
      resetPassword(resetPasswordInput: $input)
    }
  `;
}

import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

export interface ChangePassByTokenI {
  token: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChangePassByTokenGQL extends Mutation<boolean> {
  document = gql`
    mutation($input: ChangePassByTokenInput) {
      changePassByToken(changePassByTokenInput: $input)
    }
  `;
}

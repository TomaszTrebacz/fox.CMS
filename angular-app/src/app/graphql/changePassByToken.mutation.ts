import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChangePassByTokenGQL extends Mutation {
  document = gql`
    mutation($input: ChangePassByTokenInput) {
      changePassByToken(changePassByTokenInput: $input)
    }
  `;
}

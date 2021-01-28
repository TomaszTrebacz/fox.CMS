import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChangeConfirmTokenGQL extends Mutation<boolean> {
  document = gql`
    mutation($email: String!) {
      changeConfirmToken(email: $email)
    }
  `;
}

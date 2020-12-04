import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SendChangePassEmailGQL extends Mutation {
  document = gql`
    mutation($email: String!) {
      sendChangePassEmail(email: $email)
    }
  `;
}

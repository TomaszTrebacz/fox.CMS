import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class SendChangePhoneEmailGQL extends Mutation {
  document = gql`
    mutation($phoneNumber: String!) {
      sendChangePhoneEmail(phoneNumber: $phoneNumber)
    }
  `;
}

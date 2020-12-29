import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SendCodePhoneGQL extends Mutation {
  document = gql`
    mutation($phoneNumber: String!) {
      sendCodePhone(phoneNumber: $phoneNumber)
    }
  `;
}

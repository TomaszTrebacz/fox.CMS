import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class SendCodePhoneGQL extends Mutation<boolean> {
  document = gql`
    mutation($phoneNumber: String!) {
      sendCodePhone(phoneNumber: $phoneNumber)
    }
  `;
}

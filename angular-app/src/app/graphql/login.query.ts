import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Query<any> {
  document = gql`
    query($input: LoginInput) {
      login(loginCredentials: $input) {
        user {
          id
          firstName
          lastName
          phoneNumber
        }
        accessToken
        refreshToken
        role
      }
    }
  `;
}

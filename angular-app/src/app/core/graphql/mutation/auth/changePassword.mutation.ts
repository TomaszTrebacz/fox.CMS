import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordGQL extends Mutation<boolean> {
  document = gql`
    mutation($password: String) {
      changePassword(password: $password)
    }
  `;
}

import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LogoutGQL extends Mutation {
  document = gql`
    mutation logout($id: String!) {
      logout(id: $id)
    }
  `;
}

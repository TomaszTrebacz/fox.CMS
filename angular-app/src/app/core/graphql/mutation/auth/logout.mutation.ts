import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LogoutGQL extends Mutation<boolean> {
  document = gql`
    mutation logout($id: String!) {
      logout(id: $id)
    }
  `;
}

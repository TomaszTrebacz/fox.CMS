import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserGQL extends Mutation {
  document = gql`
    mutation($id: String!) {
      deleteUser(id: $id)
      deleteUserPosts(id: $id)
    }
  `;
}

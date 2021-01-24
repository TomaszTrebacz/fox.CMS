import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';

export interface ChangeRoleI {
  id: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChangeRoleGQL extends Mutation<boolean> {
  document = gql`
    mutation($input: ChangeRoleInput) {
      changeRole(changeRoleInput: $input)
    }
  `;
}

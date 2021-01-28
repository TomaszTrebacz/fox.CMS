import gql from 'graphql-tag';

export const FullName = gql`
  fragment FullName on User {
    firstName
    lastName
  }
`;

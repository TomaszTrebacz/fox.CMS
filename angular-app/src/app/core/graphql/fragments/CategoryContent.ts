import gql from 'graphql-tag';

export const CategoryContent = gql`
  fragment CategoryContent on Category {
    id
    name
  }
`;

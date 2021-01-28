import gql from 'graphql-tag';

export const PostContent = gql`
  fragment PostContent on Post {
    id
    text
    title
  }
`;

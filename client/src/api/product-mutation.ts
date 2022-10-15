import { gql } from '@apollo/client';

export const  PRODUCT = gql`
  query products {
    products {
      id
      name
      image
    }
  }
`;
import { gql, useQuery } from '@apollo/client';
import { log } from 'console';

export const  PRODUCT = gql`
  query products {
    products {
      id
      name
      image
      price
    }
  }
`;
export const GetProduct = () => {
  const {data} = useQuery(PRODUCT);
  return data;
}
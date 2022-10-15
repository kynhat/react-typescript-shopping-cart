//import { Checkout } from '../query/checkout';
import { gql, useMutation, useQuery } from '@apollo/client';
interface CreateCheckoutResponse {
    account: boolean;
}
interface CreateCheckoutResponse {
  checkout:boolean;
}
const CREATE_CHECKOUT = gql`
 mutation createCheckouts($address: String, $amount: Int, $product: [ProductInput]) {
  createCheckout(address: $address, amount: $amount, product:$product )
 }
`;
const GET_CHECTOUT = gql`
query checkouts {
    checkouts {
      amount
      address
      productcheckouts {
        id
        name
        price
        quantity
        totalprice
      }
    }
  }
`;
export function CreateCheckoutMutation() {
    return useMutation<CreateCheckoutResponse>(CREATE_CHECKOUT);
}

// export function getCheckout() {
//     return useQuery(GET_CHECTOUT);
// }
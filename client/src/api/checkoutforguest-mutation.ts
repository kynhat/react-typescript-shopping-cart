import { gql, useMutation, useQuery } from '@apollo/client';
interface CreateCheckoutResponse {
    account: boolean;
}
const CREATE_CHECKOUT_FORGUEST = gql`
 mutation createCheckoutForGuest($address: String, $amount: Int, $email: String, $firstname: String, $lastname: String, $phone: String, $product: [ProductInput]){
  createCheckoutForGuest(address: $address,amount: $amount,email: $email,firstname: $firstname,lastname: $lastname,phone: $phone,product: $product)
 }
`;
export function CreateCheckoutForguestMutation() {
    return useMutation(CREATE_CHECKOUT_FORGUEST);
}
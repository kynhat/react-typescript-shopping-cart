import { Account } from '../query/account';
import { gql, useMutation, useQuery } from '@apollo/client';

interface CreateAccountResponse {
  account:boolean;
}

interface LoginResponse {
  loginUser:boolean;
}

const CREATE_ACCOUNT = gql`
 mutation createAccount($username: String, $password: String) {
  createUser( username: $username, password: $password )
 }
`;

export const  LOGIN_ACCOUNT = gql`
  mutation loginAccount($username: String, $password: String) {
    loginUser( username: $username, password: $password )
 }
`;

export function useAccountMutation() {
 return useMutation<CreateAccountResponse>(CREATE_ACCOUNT);
}

export function useLoginAccountMutation() {
  return useMutation<LoginResponse>(LOGIN_ACCOUNT);
}
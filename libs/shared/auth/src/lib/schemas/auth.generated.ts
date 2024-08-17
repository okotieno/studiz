import * as Types from '@studiz/shared/types/frontend';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type IUserFieldsFragment = { id?: number | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt?: string | null, updatedAt?: string | null, profilePhotoLink?: string | null };

export type IAuthDetailsFragment = { accessToken: string, refreshToken: string, refreshTokenKey: string, user?: { id?: number | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt?: string | null, updatedAt?: string | null, profilePhotoLink?: string | null } | null };

export type IGoogleSignInMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type IGoogleSignInMutation = { signInWithGoogle?: { accessToken: string, refreshToken: string, refreshTokenKey: string, user?: { id?: number | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt?: string | null, updatedAt?: string | null, profilePhotoLink?: string | null } | null } | null };

export type ILoginWithTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type ILoginWithTokenMutation = { loginWithToken?: { accessToken: string, refreshToken: string, refreshTokenKey: string, user?: { id?: number | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt?: string | null, updatedAt?: string | null, profilePhotoLink?: string | null } | null } | null };

export type IRequestAccessTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String']['input'];
}>;


export type IRequestAccessTokenMutation = { requestAccessToken?: { accessToken?: string | null } | null };

export type IAuthUserAssignedWarehousesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IAuthUserAssignedWarehousesQuery = { authUserAssignedWarehouses: { items?: Array<{ id: number, name: string } | null> | null, meta?: { totalItems: number } | null } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on UserModel {
  id
  email
  firstName
  lastName
  phone
  createdAt
  updatedAt
  profilePhotoLink
}
    `;
export const AuthDetailsFragmentDoc = gql`
    fragment AuthDetails on LoginResponse {
  accessToken
  refreshToken
  refreshTokenKey
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const GoogleSignInDocument = gql`
    mutation GoogleSignIn($token: String!) {
  signInWithGoogle(token: $token) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class IGoogleSignInGQL extends Apollo.Mutation<IGoogleSignInMutation, IGoogleSignInMutationVariables> {
    override document = GoogleSignInDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginWithTokenDocument = gql`
    mutation LoginWithToken($token: String!) {
  loginWithToken(token: $token) {
    ...AuthDetails
  }
}
    ${AuthDetailsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ILoginWithTokenGQL extends Apollo.Mutation<ILoginWithTokenMutation, ILoginWithTokenMutationVariables> {
    override document = LoginWithTokenDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RequestAccessTokenDocument = gql`
    mutation RequestAccessToken($refreshToken: String!) {
  requestAccessToken(refreshToken: $refreshToken) {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IRequestAccessTokenGQL extends Apollo.Mutation<IRequestAccessTokenMutation, IRequestAccessTokenMutationVariables> {
    override document = RequestAccessTokenDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AuthUserAssignedWarehousesDocument = gql`
    query AuthUserAssignedWarehouses {
  authUserAssignedWarehouses {
    items {
      id
      name
    }
    meta {
      totalItems
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IAuthUserAssignedWarehousesGQL extends Apollo.Query<IAuthUserAssignedWarehousesQuery, IAuthUserAssignedWarehousesQueryVariables> {
    override document = AuthUserAssignedWarehousesDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

import * as Types from '@studiz/shared/types/frontend';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ICreateInstitutionRequestMutationVariables = Types.Exact<{
  input: Types.ICreateInstitutionRequestInput;
}>;


export type ICreateInstitutionRequestMutation = { createInstitutionRequest?: { message: string, data: { id: number } } | null };

export type IGetInstitutionRequestByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type IGetInstitutionRequestByIdQuery = { institutionRequest?: { id: number, name: string } | null };

export type IGetInstitutionRequestsQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.IQueryParams>;
}>;


export type IGetInstitutionRequestsQuery = { institutionRequests: { items?: Array<{ id: number, name: string } | null> | null, meta?: { totalItems: number } | null } };

export type IDeleteInstitutionRequestByIdMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type IDeleteInstitutionRequestByIdMutation = { deleteInstitutionRequest?: { message: string } | null };

export type IUpdateInstitutionRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  params: Types.IUpdateInstitutionRequestInput;
}>;


export type IUpdateInstitutionRequestMutation = { updateInstitutionRequest?: { message: string, data: { id: number } } | null };

export type IRegisterInstitutionRequestMutationVariables = Types.Exact<{
  input: Types.IRegisterInstitutionRequestInput;
}>;


export type IRegisterInstitutionRequestMutation = { registerInstitutionRequest?: { message: string, data: { id: number } } | null };

export const CreateInstitutionRequestDocument = gql`
    mutation CreateInstitutionRequest($input: CreateInstitutionRequestInput!) {
  createInstitutionRequest(input: $input) {
    message
    data {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ICreateInstitutionRequestGQL extends Apollo.Mutation<ICreateInstitutionRequestMutation, ICreateInstitutionRequestMutationVariables> {
    override document = CreateInstitutionRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetInstitutionRequestByIdDocument = gql`
    query GetInstitutionRequestById($id: Int!) {
  institutionRequest(id: $id) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IGetInstitutionRequestByIdGQL extends Apollo.Query<IGetInstitutionRequestByIdQuery, IGetInstitutionRequestByIdQueryVariables> {
    override document = GetInstitutionRequestByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetInstitutionRequestsDocument = gql`
    query GetInstitutionRequests($query: QueryParams) {
  institutionRequests(query: $query) {
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
  export class IGetInstitutionRequestsGQL extends Apollo.Query<IGetInstitutionRequestsQuery, IGetInstitutionRequestsQueryVariables> {
    override document = GetInstitutionRequestsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteInstitutionRequestByIdDocument = gql`
    mutation DeleteInstitutionRequestById($id: Int!) {
  deleteInstitutionRequest(id: $id) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IDeleteInstitutionRequestByIdGQL extends Apollo.Mutation<IDeleteInstitutionRequestByIdMutation, IDeleteInstitutionRequestByIdMutationVariables> {
    override document = DeleteInstitutionRequestByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateInstitutionRequestDocument = gql`
    mutation UpdateInstitutionRequest($id: Int!, $params: UpdateInstitutionRequestInput!) {
  updateInstitutionRequest(id: $id, params: $params) {
    message
    data {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IUpdateInstitutionRequestGQL extends Apollo.Mutation<IUpdateInstitutionRequestMutation, IUpdateInstitutionRequestMutationVariables> {
    override document = UpdateInstitutionRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterInstitutionRequestDocument = gql`
    mutation RegisterInstitutionRequest($input: RegisterInstitutionRequestInput!) {
  registerInstitutionRequest(input: $input) {
    message
    data {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IRegisterInstitutionRequestGQL extends Apollo.Mutation<IRegisterInstitutionRequestMutation, IRegisterInstitutionRequestMutationVariables> {
    override document = RegisterInstitutionRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
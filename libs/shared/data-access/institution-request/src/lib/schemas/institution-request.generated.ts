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


export type IGetInstitutionRequestByIdQuery = { institutionRequest?: { id: number, institutionName: string } | null };

export type IGetInstitutionRequestsQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.IQueryParams>;
}>;


export type IGetInstitutionRequestsQuery = { institutionRequests: { items?: Array<{ id: number, institutionName: string, adminEmail: string, slug: string, status?: Types.IInstitutionRequestStatus | null, progressData?: { institutionInfo?: { name?: string | null, logoFileUpload?: { originalName?: string | null, id: number, url?: string | null, mimetype?: string | null, size?: number | null } | null } | null, adminInfos?: Array<{ lastName?: string | null, firstName?: string | null, email?: string | null } | null> | null } | null } | null> | null, meta?: { totalItems: number } | null } };

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

export type IUpdateInstitutionRequestProgressMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  params: Types.IInstitutionRequestProgressDataInput;
}>;


export type IUpdateInstitutionRequestProgressMutation = { updateInstitutionRequestProgress?: { message: string } | null };

export type ICompleteInstitutionRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type ICompleteInstitutionRequestMutation = { completeRequestRegistration?: { message: string } | null };

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
    institutionName
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
      institutionName
      adminEmail
      slug
      status
      progressData {
        institutionInfo {
          name
          logoFileUpload {
            originalName
            id
            url
            mimetype
            size
          }
        }
        adminInfos {
          lastName
          firstName
          email
        }
      }
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
export const UpdateInstitutionRequestProgressDocument = gql`
    mutation UpdateInstitutionRequestProgress($id: Int!, $params: InstitutionRequestProgressDataInput!) {
  updateInstitutionRequestProgress(id: $id, params: $params) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IUpdateInstitutionRequestProgressGQL extends Apollo.Mutation<IUpdateInstitutionRequestProgressMutation, IUpdateInstitutionRequestProgressMutationVariables> {
    override document = UpdateInstitutionRequestProgressDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CompleteInstitutionRequestDocument = gql`
    mutation CompleteInstitutionRequest($id: String!) {
  completeRequestRegistration(input: {id: $id}) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ICompleteInstitutionRequestGQL extends Apollo.Mutation<ICompleteInstitutionRequestMutation, ICompleteInstitutionRequestMutationVariables> {
    override document = CompleteInstitutionRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
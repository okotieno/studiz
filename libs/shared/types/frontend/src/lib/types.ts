export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type IAccessToken = {
  accessToken?: Maybe<Scalars['String']['output']>;
};

export type ICreateInstitutionInput = {
  logoFileUpload?: InputMaybe<ISelectCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateInstitutionRequestInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateInstitutionRequestSuccessResponse = {
  data: IInstitutionRequestModel;
  message: Scalars['String']['output'];
};

export type ICreateInstitutionSuccessResponse = {
  data: IInstitutionModel;
  message: Scalars['String']['output'];
};

export type ICreatePermissionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreatePermissionSuccessResponse = {
  data: IPermissionModel;
  message: Scalars['String']['output'];
};

export type ICreateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateRoleSuccessResponse = {
  data: IRoleModel;
  message: Scalars['String']['output'];
};

export type ICreateSuccessStringIdResponse = {
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ICreateUserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateUserSuccessResponse = {
  data: IUserModel;
  message: Scalars['String']['output'];
};

export type IDeleteSuccessResponse = {
  message: Scalars['String']['output'];
};

export type IFileUploadModel = {
  id: Scalars['Int']['output'];
  mimetype?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  originalName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type IIdOnly = {
  id?: Maybe<Scalars['Int']['output']>;
};

export type IInstitutionModel = {
  id: Scalars['Int']['output'];
  logoFileUpload?: Maybe<IFileUploadModel>;
  name: Scalars['String']['output'];
};

export type IInstitutionRequestModel = {
  adminEmail: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  institutionName: Scalars['String']['output'];
  progressData?: Maybe<IInstitutionRequestProgressData>;
  slug: Scalars['String']['output'];
  status?: Maybe<IInstitutionRequestStatus>;
};

export type IInstitutionRequestProgressData = {
  adminInfos?: Maybe<Array<Maybe<IInstitutionRequestProgressDataAdminsInfo>>>;
  institutionInfo?: Maybe<IInstitutionRequestProgressDataInstitutionInfo>;
};

export type IInstitutionRequestProgressDataAdminsInfo = {
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export type IInstitutionRequestProgressDataAdminsInfoInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type IInstitutionRequestProgressDataInput = {
  adminInfos?: InputMaybe<Array<InputMaybe<IInstitutionRequestProgressDataAdminsInfoInput>>>;
  institutionInfo?: InputMaybe<IInstitutionRequestProgressDataInstitutionInfoInput>;
};

export type IInstitutionRequestProgressDataInstitutionInfo = {
  logoFileUpload?: Maybe<IIdOnly>;
  name?: Maybe<Scalars['String']['output']>;
};

export type IInstitutionRequestProgressDataInstitutionInfoInput = {
  logoFileUpload?: InputMaybe<ISelectCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum IInstitutionRequestStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type ILoginResponse = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenKey: Scalars['String']['output'];
  user?: Maybe<IUserModel>;
};

export type IMutation = {
  completeRequestRegistration?: Maybe<ISuccessResponse>;
  createInstitution?: Maybe<ICreateInstitutionSuccessResponse>;
  createInstitutionRequest?: Maybe<ICreateInstitutionRequestSuccessResponse>;
  createPermission?: Maybe<ICreatePermissionSuccessResponse>;
  createRole?: Maybe<ICreateRoleSuccessResponse>;
  createUser?: Maybe<ICreateUserSuccessResponse>;
  deleteInstitution?: Maybe<IDeleteSuccessResponse>;
  deleteInstitutionRequest?: Maybe<IDeleteSuccessResponse>;
  deletePermission?: Maybe<IDeleteSuccessResponse>;
  deleteRole?: Maybe<IDeleteSuccessResponse>;
  deleteUser?: Maybe<IDeleteSuccessResponse>;
  loginWithToken?: Maybe<ILoginResponse>;
  registerInstitutionRequest?: Maybe<ICreateInstitutionRequestSuccessResponse>;
  requestAccessToken?: Maybe<IAccessToken>;
  requestLoginLink?: Maybe<ISuccessResponse>;
  signInWithGoogle?: Maybe<ILoginResponse>;
  test?: Maybe<Scalars['String']['output']>;
  updateInstitution?: Maybe<ICreateInstitutionSuccessResponse>;
  updateInstitutionRequest?: Maybe<ICreateInstitutionRequestSuccessResponse>;
  updateInstitutionRequestProgress?: Maybe<ISuccessResponse>;
  updatePermission?: Maybe<ICreatePermissionSuccessResponse>;
  updateRole?: Maybe<ICreateRoleSuccessResponse>;
  updateUser?: Maybe<ICreateUserSuccessResponse>;
  uploadSingleFile: IUploadSuccessResponse;
};


export type IMutationCompleteRequestRegistrationArgs = {
  input?: InputMaybe<ISelectCategory>;
};


export type IMutationCreateInstitutionArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateInstitutionRequestArgs = {
  input?: InputMaybe<ICreateInstitutionRequestInput>;
};


export type IMutationCreatePermissionArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateRoleArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateUserArgs = {
  name: Scalars['String']['input'];
};


export type IMutationDeleteInstitutionArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteInstitutionRequestArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeletePermissionArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationLoginWithTokenArgs = {
  token: Scalars['String']['input'];
};


export type IMutationRegisterInstitutionRequestArgs = {
  input: IRegisterInstitutionRequestInput;
};


export type IMutationRequestAccessTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type IMutationRequestLoginLinkArgs = {
  email: Scalars['String']['input'];
};


export type IMutationSignInWithGoogleArgs = {
  token: Scalars['String']['input'];
};


export type IMutationUpdateInstitutionArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateInstitutionInput>;
};


export type IMutationUpdateInstitutionRequestArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateInstitutionRequestInput>;
};


export type IMutationUpdateInstitutionRequestProgressArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IInstitutionRequestProgressDataInput>;
};


export type IMutationUpdatePermissionArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdatePermissionInput>;
};


export type IMutationUpdateRoleArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateRoleInput>;
};


export type IMutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateUserInput>;
};


export type IMutationUploadSingleFileArgs = {
  file: Scalars['Upload']['input'];
};

export type IPaginatedFileUpload = {
  items?: Maybe<Array<Maybe<IFileUploadModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedInstitution = {
  items?: Maybe<Array<Maybe<IInstitutionModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedInstitutionRequest = {
  items?: Maybe<Array<Maybe<IInstitutionRequestModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedPermission = {
  items?: Maybe<Array<Maybe<IPermissionModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedRole = {
  items?: Maybe<Array<Maybe<IRoleModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedUser = {
  items?: Maybe<Array<Maybe<IUserModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPagination = {
  totalItems: Scalars['Int']['output'];
};

export type IPermissionModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IQuery = {
  fileUploads: IPaginatedFileUpload;
  institution?: Maybe<IInstitutionModel>;
  institutionRequest?: Maybe<IInstitutionRequestModel>;
  institutionRequests: IPaginatedInstitutionRequest;
  institutions: IPaginatedInstitution;
  permission?: Maybe<IPermissionModel>;
  permissions: IPaginatedPermission;
  role?: Maybe<IRoleModel>;
  roles: IPaginatedRole;
  test?: Maybe<Scalars['String']['output']>;
  user?: Maybe<IUserModel>;
  users: IPaginatedUser;
};


export type IQueryFileUploadsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryInstitutionArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryInstitutionRequestArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryInstitutionRequestsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryInstitutionsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryPermissionArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryPermissionsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryRolesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryUsersArgs = {
  query?: InputMaybe<IQueryParams>;
};

export enum IQueryOperatorEnum {
  Between = 'BETWEEN',
  Contains = 'CONTAINS',
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  In = 'IN',
  LessThan = 'LESS_THAN'
}

export type IQueryParams = {
  currentPage?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<Array<InputMaybe<IQueryParamsFilter>>>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortByDirection?: InputMaybe<ISortByEnum>;
};

export type IQueryParamsFilter = {
  field?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<IQueryOperatorEnum>;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type IRegisterInstitutionRequestInput = {
  adminEmail: Scalars['String']['input'];
  institutionName: Scalars['String']['input'];
};

export type IRoleModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ISelectCategory = {
  id: Scalars['Int']['input'];
};

export type ISelectCategoryString = {
  id: Scalars['String']['input'];
};

export enum ISortByEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ISuccessResponse = {
  message: Scalars['String']['output'];
};

export type IUpdateInstitutionInput = {
  logoFileUpload?: InputMaybe<ISelectCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateInstitutionRequestInput = {
  adminEmail: Scalars['String']['input'];
  institutionName: Scalars['String']['input'];
  progressData?: InputMaybe<IInstitutionRequestProgressDataInput>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<IInstitutionRequestStatus>;
};

export type IUpdatePermissionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateUserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUploadSuccessResponse = {
  data?: Maybe<IFileUploadModel>;
  message?: Maybe<Scalars['String']['output']>;
};

export type IUserModel = {
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerifiedAt?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  phoneVerifiedAt?: Maybe<Scalars['String']['output']>;
  profilePhotoLink?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

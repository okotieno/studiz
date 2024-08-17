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

export type ICatalogueModel = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Maybe<IFileUploadModel>>>;
  name: Scalars['String']['output'];
  product: IProductModel;
  purchaseUOM?: Maybe<IUomModel>;
  saleUOMs?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
};

export type ICatalogueSaleUnitOfMeasurementInput = {
  quantityInPurchaseUom: Scalars['Float']['input'];
  sellingPrice: Scalars['Float']['input'];
  uom: ISelectCategory;
};

export type ICountriesLanguagesInput = {
  countryId: Scalars['Int']['input'];
  languageId: Scalars['Int']['input'];
};

export type ICountryModel = {
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  shortCode: Scalars['String']['output'];
};

export type ICreateCatalogueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  name: Scalars['String']['input'];
  product?: InputMaybe<ISelectCategory>;
  purchaseUOM?: InputMaybe<ISelectCategory>;
  saleUOMs?: InputMaybe<Array<InputMaybe<ICatalogueSaleUnitOfMeasurementInput>>>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateCatalogueSuccessResponse = {
  data: ICatalogueModel;
  message: Scalars['String']['output'];
};

export type ICreateCountryInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};

export type ICreateCountrySuccessResponse = {
  data: ICountryModel;
  message: Scalars['String']['output'];
};

export type ICreateCurrencyInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ICreateCurrencySuccessResponse = {
  data: ICurrencyModel;
  message: Scalars['String']['output'];
};

export type ICreateDistrictInput = {
  countryId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  polygon?: InputMaybe<Array<InputMaybe<ILatLngInput>>>;
};

export type ICreateDistrictSuccessResponse = {
  data: IDistrictModel;
  message: Scalars['String']['output'];
};

export type ICreateInventoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateInventorySuccessResponse = {
  data: IInventoryModel;
  message: Scalars['String']['output'];
};

export type ICreateLanguageInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ICreateLanguageSuccessResponse = {
  data: ILanguageModel;
  message: Scalars['String']['output'];
};

export type ICreatePermissionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreatePermissionSuccessResponse = {
  data: IPermissionModel;
  message: Scalars['String']['output'];
};

export type ICreatePriceInput = {
  catalogue?: InputMaybe<ISelectCategory>;
  name: Scalars['String']['input'];
  value: Scalars['Float']['input'];
  warehouse?: InputMaybe<ISelectCategory>;
};

export type ICreatePriceSuccessResponse = {
  data: IPriceModel;
  message: Scalars['String']['output'];
};

export type ICreateProductCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateProductCategorySuccessResponse = {
  data: IProductCategoryModel;
  message: Scalars['String']['output'];
};

export type ICreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productCategories?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  productImages?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
};

export type ICreateProductSuccessResponse = {
  data: IProductModel;
  message: Scalars['String']['output'];
};

export type ICreateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateRoleSuccessResponse = {
  data: IUserModel;
  message: Scalars['String']['output'];
};

export type ICreateRouteInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateRouteSuccessResponse = {
  data: IRouteModel;
  message: Scalars['String']['output'];
};

export type ICreateShelfInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateShelfSuccessResponse = {
  data: IShelfModel;
  message: Scalars['String']['output'];
};

export type ICreateSuccessStringIdResponse = {
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ICreateUomInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ICreateUomSuccessResponse = {
  data: IUomModel;
  message: Scalars['String']['output'];
};

export type ICreateUserSuccessResponse = {
  data: IUserModel;
  message: Scalars['String']['output'];
};

export type ICreateWarehouseInput = {
  location?: InputMaybe<ILatLngInput>;
  name: Scalars['String']['input'];
};

export type ICreateWarehouseSuccessResponse = {
  data: IWarehouseModel;
  message: Scalars['String']['output'];
};

export type ICurrencyModel = {
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IDeleteSuccessResponse = {
  message: Scalars['String']['output'];
};

export type IDistrictModel = {
  country: ICountryModel;
  countryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  polygon?: Maybe<Array<Maybe<ILatLng>>>;
};

export type IFileUploadModel = {
  id: Scalars['Int']['output'];
  mimetype?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  originalName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type IInventoryModel = {
  catalogue?: Maybe<ICatalogueModel>;
  catalogueId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  partialQuantities?: Maybe<Array<Maybe<IPartialInventoryModel>>>;
  quantity: Scalars['Float']['output'];
};

export type ILanguageModel = {
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ILatLng = {
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type ILatLngInput = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export type ILoginResponse = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenKey: Scalars['String']['output'];
  user?: Maybe<IUserModel>;
};

export type IMutation = {
  allocateWarehouseToUser?: Maybe<ISuccessResponse>;
  assignCatalogueToWarehouse?: Maybe<ISuccessResponse>;
  assignCountriesLanguagesToUser?: Maybe<ISuccessResponse>;
  assignRoleToUser?: Maybe<ISuccessResponse>;
  createBulkCatalogues?: Maybe<ISuccessResponse>;
  createCatalogue?: Maybe<ICreateCatalogueSuccessResponse>;
  createCountry?: Maybe<ICreateCountrySuccessResponse>;
  createCurrency?: Maybe<ICreateCurrencySuccessResponse>;
  createDistrict?: Maybe<ICreateDistrictSuccessResponse>;
  createInventory?: Maybe<ICreateInventorySuccessResponse>;
  createLanguage?: Maybe<ICreateLanguageSuccessResponse>;
  createPermission?: Maybe<ICreateUserSuccessResponse>;
  createPrice?: Maybe<ICreatePriceSuccessResponse>;
  createProduct?: Maybe<ICreateProductSuccessResponse>;
  createProductCategory?: Maybe<ICreateProductCategorySuccessResponse>;
  createRole?: Maybe<ICreateUserSuccessResponse>;
  createRoute?: Maybe<ICreateRouteSuccessResponse>;
  createShelf?: Maybe<ICreateShelfSuccessResponse>;
  createUom?: Maybe<ICreateUomSuccessResponse>;
  createUser?: Maybe<ICreateUserSuccessResponse>;
  createWarehouse?: Maybe<ICreateWarehouseSuccessResponse>;
  deleteCatalogue?: Maybe<IDeleteSuccessResponse>;
  deleteCountry?: Maybe<IDeleteSuccessResponse>;
  deleteCurrency?: Maybe<IDeleteSuccessResponse>;
  deleteDistrict?: Maybe<IDeleteSuccessResponse>;
  deleteInventory?: Maybe<IDeleteSuccessResponse>;
  deleteLanguage?: Maybe<IDeleteSuccessResponse>;
  deletePermission?: Maybe<IDeleteSuccessResponse>;
  deletePrice?: Maybe<IDeleteSuccessResponse>;
  deleteProduct?: Maybe<IDeleteSuccessResponse>;
  deleteProductCategory?: Maybe<IDeleteSuccessResponse>;
  deleteRole?: Maybe<IDeleteSuccessResponse>;
  deleteRoute?: Maybe<IDeleteSuccessResponse>;
  deleteShelf?: Maybe<IDeleteSuccessResponse>;
  deleteUom?: Maybe<IDeleteSuccessResponse>;
  deleteUser?: Maybe<IDeleteSuccessResponse>;
  deleteWarehouse?: Maybe<IDeleteSuccessResponse>;
  givePermissionsToRole?: Maybe<ISuccessResponse>;
  loginWithToken?: Maybe<ILoginResponse>;
  requestAccessToken?: Maybe<IAccessToken>;
  signInWithGoogle?: Maybe<ILoginResponse>;
  test?: Maybe<Scalars['String']['output']>;
  updateCatalogue?: Maybe<ICreateCatalogueSuccessResponse>;
  updateCountry?: Maybe<ICreateCountrySuccessResponse>;
  updateCurrency?: Maybe<ICreateCurrencySuccessResponse>;
  updateDistrict?: Maybe<ICreateDistrictSuccessResponse>;
  updateInventory?: Maybe<ICreateInventorySuccessResponse>;
  updateLanguage?: Maybe<ICreateLanguageSuccessResponse>;
  updatePermission?: Maybe<ICreatePermissionSuccessResponse>;
  updatePrice?: Maybe<ICreatePriceSuccessResponse>;
  updateProduct?: Maybe<ICreateProductSuccessResponse>;
  updateProductCategory?: Maybe<ICreateProductCategorySuccessResponse>;
  updateRole?: Maybe<ICreateRoleSuccessResponse>;
  updateRoute?: Maybe<ICreateRouteSuccessResponse>;
  updateShelf?: Maybe<ICreateShelfSuccessResponse>;
  updateUom?: Maybe<ICreateUomSuccessResponse>;
  updateUser?: Maybe<ICreateUserSuccessResponse>;
  updateWarehouse?: Maybe<ICreateWarehouseSuccessResponse>;
  updateWarehouseLocation?: Maybe<ISuccessResponse>;
  updateWarehouseShelves?: Maybe<ISuccessResponse>;
  uploadSingleFile: IUploadSuccessResponse;
};


export type IMutationAllocateWarehouseToUserArgs = {
  userId: Scalars['Int']['input'];
  warehouses?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
};


export type IMutationAssignCatalogueToWarehouseArgs = {
  catalogues?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  warehouse?: InputMaybe<ISelectCategory>;
};


export type IMutationAssignCountriesLanguagesToUserArgs = {
  countriesLanguages?: InputMaybe<Array<InputMaybe<ICountriesLanguagesInput>>>;
  userId: Scalars['Int']['input'];
};


export type IMutationAssignRoleToUserArgs = {
  roles?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationCreateBulkCataloguesArgs = {
  catalogues?: InputMaybe<Array<InputMaybe<ICreateCatalogueInput>>>;
};


export type IMutationCreateCatalogueArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  name: Scalars['String']['input'];
  product?: InputMaybe<ISelectCategory>;
  purchaseUOM?: InputMaybe<ISelectCategory>;
  saleUOMs?: InputMaybe<Array<InputMaybe<ICatalogueSaleUnitOfMeasurementInput>>>;
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationCreateCountryArgs = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};


export type IMutationCreateCurrencyArgs = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type IMutationCreateDistrictArgs = {
  country: ISelectCategory;
  name: Scalars['String']['input'];
  polygon?: InputMaybe<Array<InputMaybe<ILatLngInput>>>;
};


export type IMutationCreateInventoryArgs = {
  catalogue: ISelectCategory;
  quantity: Scalars['Float']['input'];
  warehouse: ISelectCategory;
};


export type IMutationCreateLanguageArgs = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type IMutationCreatePermissionArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreatePriceArgs = {
  catalogue?: InputMaybe<ISelectCategory>;
  name: Scalars['String']['input'];
  value: Scalars['Float']['input'];
  warehouse?: InputMaybe<ISelectCategory>;
};


export type IMutationCreateProductArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  productCategories: Array<ISelectCategory>;
  productImages: Array<ISelectCategory>;
};


export type IMutationCreateProductCategoryArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateRoleArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateRouteArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateShelfArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateUomArgs = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type IMutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationCreateWarehouseArgs = {
  name: Scalars['String']['input'];
};


export type IMutationDeleteCatalogueArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteCountryArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteCurrencyArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteDistrictArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteInventoryArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteLanguageArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeletePermissionArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeletePriceArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteProductCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteRouteArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteShelfArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteUomArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationDeleteWarehouseArgs = {
  id: Scalars['Int']['input'];
};


export type IMutationGivePermissionsToRoleArgs = {
  permissions?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};


export type IMutationLoginWithTokenArgs = {
  token: Scalars['String']['input'];
};


export type IMutationRequestAccessTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type IMutationSignInWithGoogleArgs = {
  token: Scalars['String']['input'];
};


export type IMutationUpdateCatalogueArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateCatalogueInput>;
};


export type IMutationUpdateCountryArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateCountryInput>;
};


export type IMutationUpdateCurrencyArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateCurrencyInput>;
};


export type IMutationUpdateDistrictArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateDistrictInput>;
};


export type IMutationUpdateInventoryArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateInventoryInput>;
};


export type IMutationUpdateLanguageArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateLanguageInput>;
};


export type IMutationUpdatePermissionArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdatePermissionInput>;
};


export type IMutationUpdatePriceArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdatePriceInput>;
};


export type IMutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateProductInput>;
};


export type IMutationUpdateProductCategoryArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateProductCategoryInput>;
};


export type IMutationUpdateRoleArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateRoleInput>;
};


export type IMutationUpdateRouteArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateRouteInput>;
};


export type IMutationUpdateShelfArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateShelfInput>;
};


export type IMutationUpdateUomArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateUomInput>;
};


export type IMutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateUserInput>;
};


export type IMutationUpdateWarehouseArgs = {
  id: Scalars['Int']['input'];
  params?: InputMaybe<IUpdateWarehouseInput>;
};


export type IMutationUpdateWarehouseLocationArgs = {
  id: Scalars['Int']['input'];
  location?: InputMaybe<ILatLngInput>;
};


export type IMutationUpdateWarehouseShelvesArgs = {
  shelves: Array<IWarehouseShelfInput>;
  warehouseId: Scalars['Int']['input'];
};


export type IMutationUploadSingleFileArgs = {
  file: Scalars['Upload']['input'];
};

export type IPaginatedCatalogue = {
  items?: Maybe<Array<Maybe<ICatalogueModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedCountry = {
  items?: Maybe<Array<Maybe<ICountryModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedCurrency = {
  items?: Maybe<Array<Maybe<ICurrencyModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedDistrict = {
  items?: Maybe<Array<Maybe<IDistrictModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedFileUpload = {
  items?: Maybe<Array<Maybe<IFileUploadModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedInventory = {
  items?: Maybe<Array<Maybe<IInventoryModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedLanguage = {
  items?: Maybe<Array<Maybe<ILanguageModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedPartialInventory = {
  items?: Maybe<Array<Maybe<IPartialInventoryModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedPermission = {
  items?: Maybe<Array<Maybe<IRoleModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedPrice = {
  items?: Maybe<Array<Maybe<IPriceModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedProduct = {
  items?: Maybe<Array<Maybe<IProductModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedProductCategory = {
  items?: Maybe<Array<Maybe<IProductCategoryModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedRole = {
  items?: Maybe<Array<Maybe<IRoleModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedRoute = {
  items?: Maybe<Array<Maybe<IRouteModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedShelf = {
  items?: Maybe<Array<Maybe<IShelfModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedUom = {
  items?: Maybe<Array<Maybe<IUomModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedUser = {
  items?: Maybe<Array<Maybe<IUserModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedUserRoles = {
  items?: Maybe<Array<Maybe<IRoleModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPaginatedWarehouse = {
  items?: Maybe<Array<Maybe<IWarehouseModel>>>;
  meta?: Maybe<IPagination>;
};

export type IPagination = {
  totalItems: Scalars['Int']['output'];
};

export type IPartialInventoryModel = {
  catalogueId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  quantity?: Maybe<Scalars['Float']['output']>;
  uom?: Maybe<IUomModel>;
  uomId: Scalars['Int']['output'];
};

export type IPermissionModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  roles?: Maybe<IRoleModel>;
};

export type IPriceModel = {
  catalogue?: Maybe<ICatalogueModel>;
  catalogueId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  value: Scalars['Float']['output'];
  warehouse?: Maybe<IWarehouseModel>;
  warehouseId?: Maybe<Scalars['Int']['output']>;
};

export type IProductCategoryModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IProductModel = {
  catalogues?: Maybe<Array<Maybe<ICatalogueModel>>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productCategories?: Maybe<Array<Maybe<IProductCategoryModel>>>;
  productImages?: Maybe<Array<Maybe<IFileUploadModel>>>;
};

export type IProfile = {
  permissions?: Maybe<Array<Maybe<IPermissionModel>>>;
  roles?: Maybe<Array<Maybe<IRoleModel>>>;
  userInfo?: Maybe<IUserModel>;
};

export type IQuery = {
  authUserAssignedWarehouses: IPaginatedWarehouse;
  catalogue?: Maybe<ICatalogueModel>;
  catalogues: IPaginatedCatalogue;
  countries: IPaginatedCountry;
  country?: Maybe<ICountryModel>;
  currencies: IPaginatedCurrency;
  currency?: Maybe<ICurrencyModel>;
  district?: Maybe<IDistrictModel>;
  districts: IPaginatedDistrict;
  fileUploads: IPaginatedFileUpload;
  inventories: IPaginatedInventory;
  inventory?: Maybe<IInventoryModel>;
  language?: Maybe<ILanguageModel>;
  languages: IPaginatedLanguage;
  myProfile?: Maybe<IProfile>;
  partialInventories?: Maybe<IPaginatedPartialInventory>;
  partialInventory?: Maybe<IPartialInventoryModel>;
  permission?: Maybe<IPermissionModel>;
  permissions: IPaginatedPermission;
  price?: Maybe<IPriceModel>;
  prices: IPaginatedPrice;
  product?: Maybe<IProductModel>;
  productCategories: IPaginatedProductCategory;
  productCategory?: Maybe<IProductCategoryModel>;
  products: IPaginatedProduct;
  role?: Maybe<IRoleModel>;
  roles: IPaginatedRole;
  route?: Maybe<IRouteModel>;
  routes: IPaginatedRoute;
  shelf?: Maybe<IShelfModel>;
  shelves: IPaginatedShelf;
  test?: Maybe<Scalars['String']['output']>;
  uom?: Maybe<IUomModel>;
  uoms: IPaginatedUom;
  user?: Maybe<IUserModel>;
  userRoles?: Maybe<IPaginatedUserRoles>;
  users: IPaginatedUser;
  warehouse?: Maybe<IWarehouseModel>;
  warehouses: IPaginatedWarehouse;
};


export type IQueryCatalogueArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryCataloguesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryCountriesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryCountryArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryCurrenciesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryCurrencyArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryDistrictArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryDistrictsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryFileUploadsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryInventoriesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryInventoryArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryLanguageArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryLanguagesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryPartialInventoriesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryPartialInventoryArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryPermissionArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryPermissionsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryPriceArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryPricesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryProductCategoriesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryProductCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryProductsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryRolesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryRouteArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryRoutesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryShelfArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryShelvesArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryUomArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryUomsArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryUserRolesArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type IQueryUsersArgs = {
  query?: InputMaybe<IQueryParams>;
};


export type IQueryWarehouseArgs = {
  id: Scalars['Int']['input'];
};


export type IQueryWarehousesArgs = {
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

export type IRoleModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<IPermissionModel>>>;
};

export type IRouteModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ISelectCategory = {
  id: Scalars['Int']['input'];
};

export type IShelfModel = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export enum ISortByEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ISuccessResponse = {
  message: Scalars['String']['output'];
};

export type IUomModel = {
  abbreviation?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type IUpdateCatalogueInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateCountryInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  shortCode: Scalars['String']['input'];
};

export type IUpdateCurrencyInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type IUpdateDistrictInput = {
  country: ISelectCategory;
  name: Scalars['String']['input'];
  polygon?: InputMaybe<Array<InputMaybe<ILatLngInput>>>;
};

export type IUpdateInventoryInput = {
  catalogueId: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type IUpdateLanguageInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type IUpdatePartialInventoryInput = {
  catalogueId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  uomId: Scalars['Int']['input'];
};

export type IUpdatePermissionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdatePriceInput = {
  catalogue?: InputMaybe<ISelectCategory>;
  name: Scalars['String']['input'];
  value: Scalars['Float']['input'];
  warehouse?: InputMaybe<ISelectCategory>;
};

export type IUpdateProductCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productCategories?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
  productImages?: InputMaybe<Array<InputMaybe<ISelectCategory>>>;
};

export type IUpdateRoleInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateRouteInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateShelfInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateUomInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type IUpdateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateWarehouseInput = {
  location?: InputMaybe<ILatLngInput>;
  name: Scalars['String']['input'];
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

export type IWarehouseModel = {
  id: Scalars['Int']['output'];
  location?: Maybe<ILatLng>;
  name: Scalars['String']['output'];
};

export type IWarehouseShelfInput = {
  children?: InputMaybe<Array<InputMaybe<IWarehouseShelfInput>>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  nodeId: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};

// @ts-expect-error process redeclaration
declare const process: {
  env: {
    API_URL: string;
  };
};

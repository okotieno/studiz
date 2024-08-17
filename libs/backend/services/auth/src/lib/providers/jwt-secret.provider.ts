export const jwtSecretProvider = {
  provide: 'JWT_SECRET',
  useValue: String(process.env['STUDIZ_JWT_SECRET'])
};

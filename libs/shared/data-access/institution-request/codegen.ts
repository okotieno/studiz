import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/backend/src/app/schemas',
  generates: {
    [`libs/shared/data-access/institution-request/src/lib/graphql/generated.ts`]:
      {
        documents: `libs/shared/data-access/institution-request/src/lib/**/*.gql`,
        plugins: ['typescript-operations', 'typescript-apollo-angular'],
        preset: 'near-operation-file',
        presetConfig: {
          extension: '.generated.ts',
          baseTypesPath: '~@studiz/shared/types/frontend',
        },
        config: {
          addExplicitOverride: true,
          typesPrefix: 'I',
          skipTypename: true,
        },
      },
  },
  overwrite: true,
};
export default config;

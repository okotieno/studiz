import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/backend/graphql/src/lib/schemas',
  generates: {
    [`libs/shared/data-access/institution-request/src/lib/generated.ts`]:
      {
        documents: `libs/shared/data-access/institution-request/src/lib/schemas/*.gql`,
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

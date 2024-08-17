import { formatFiles, generateFiles, names, readJson, Tree } from '@nx/devkit';
import * as path from 'path';
import { BackendGeneratorResolvedSchema, CrudGeneratorSchema } from './schema';
import { plural } from './helpers/plural.helper';
import updateAppModuleImports from './helpers/update-app-module-model-imports.helper';
import updateDbModuleImports from './helpers/update-db-module-model-imports.helper';
import updateProjectList from './helpers/update-project-list';
import updateModelExports from './helpers/update-model-exports.helper';
import updatePermissionEnumList from './helpers/update-enum-list';
import updatePermissionSeederList from './helpers/update-permissions-seeder-list';
import updateAppModuleSpecs from './helpers/update-app-module-specs.helper';

const getScopeName = (tree: Tree): string => {
  try {
    const packageName = readJson(tree, 'package.json').name;
    return packageName.split('/')[0];
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
};


const resolveOptions: (tree: Tree, options: CrudGeneratorSchema) => BackendGeneratorResolvedSchema = (tree: Tree, options: CrudGeneratorSchema) => {
  const scopeName = getScopeName(tree);
  const namePluralObject = Object.keys(names(options.name)).reduce((result, key) => {
    const pluralKey = key + 'Plural';
    result[pluralKey] = plural(names(options.name)[key]);
    return result;
  }, {});

  return {
    ...options,
    scopeName,
    ...names(options.name),
    ...namePluralObject,
    timeStamp: new Date().toISOString().replace(/[-T:Z.]/g, '').substring(0, 14),
    constantNamePlural: plural(names(options.name).constantName).toUpperCase(),
    backendProjectName: options.backendProjectName?.length > 0 ? options.backendProjectName : 'backend'
  } as BackendGeneratorResolvedSchema;
};

async function generateBackend(tree: Tree, options: BackendGeneratorResolvedSchema) {
  const projectRoot = `libs/${options.backendProjectName}`;

  generateFiles(tree, path.join(__dirname, 'files', 'backend'), projectRoot, options);
  await formatFiles(tree);
}

async function generateBackendModel(tree: Tree, options: BackendGeneratorResolvedSchema) {
  const projectRoot = `libs/${options.backendProjectName}/db/src/lib/models`;
  generateFiles(tree, path.join(__dirname, 'files', 'models'), projectRoot, options);
  await formatFiles(tree);
}

async function generateBackendService(tree: Tree, options: BackendGeneratorResolvedSchema) {
  const projectRoot = `libs/${options.backendProjectName}/services`;

  generateFiles(tree, path.join(__dirname, 'files', 'backend-service'), projectRoot, options);
  await formatFiles(tree);
}
async function generateSchema(tree: Tree, options: BackendGeneratorResolvedSchema) {
  const projectRoot = `apps/${options.backendProjectName}/src/app/schemas`;

  generateFiles(tree, path.join(__dirname, 'files', 'schemas'), projectRoot, options);
  await formatFiles(tree);
}

export async function crudGenerator(tree: Tree, options: CrudGeneratorSchema) {

  await updateAppModuleImports(tree, resolveOptions(tree, options));
  await updateAppModuleSpecs(tree, resolveOptions(tree, options));
  await updateDbModuleImports(tree, resolveOptions(tree, options));
  await generateBackendService(tree, resolveOptions(tree, options));
  await generateBackend(tree, resolveOptions(tree, options));
  await updateProjectList(tree, `tsconfig.base.json`, resolveOptions(tree, options));
  await updateModelExports(tree, resolveOptions(tree, options));
  await generateBackendModel(tree, resolveOptions(tree, options));
  await updatePermissionEnumList(tree, resolveOptions(tree, options));
  await updatePermissionSeederList(tree, resolveOptions(tree, options));
  await generateSchema(tree, resolveOptions(tree, options));
  await formatFiles(tree);

}


export default crudGenerator;

import { formatFiles, generateFiles, names, readJson, Tree } from '@nx/devkit';
import * as path from 'path';
import { FrontendGeneratorResolvedSchema, CrudGeneratorSchema } from './schema';
import { plural } from './helpers/plural.helper';
import updateProjectList from './helpers/update-project-list';

const getScopeName = (tree: Tree): string => {
  try {
    const packageName = readJson(tree, 'package.json').name;
    return packageName.split('/')[0];
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
};


const resolveOptions: (tree: Tree, options: CrudGeneratorSchema) => FrontendGeneratorResolvedSchema = (tree: Tree, options: CrudGeneratorSchema) => {
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
  } as FrontendGeneratorResolvedSchema;
};

async function generateFrontend(tree: Tree, options: FrontendGeneratorResolvedSchema) {
  const projectRoot = `libs/admin-portal/pages`;

  generateFiles(tree, path.join(__dirname, 'files', 'frontend-admin-portal'), projectRoot, options);
  await formatFiles(tree);
}
async function generateFrontendService(tree: Tree, options: FrontendGeneratorResolvedSchema) {
  const projectRoot = `libs/shared/data-access`;

  generateFiles(tree, path.join(__dirname, 'files', 'frontend-admin-portal-service'), projectRoot, options);
  await formatFiles(tree);
}

export async function crudGenerator(tree: Tree, options: CrudGeneratorSchema) {

  await generateFrontend(tree, resolveOptions(tree, options));
  await generateFrontendService(tree, resolveOptions(tree, options));
  await updateProjectList(tree, `tsconfig.base.json`, resolveOptions(tree, options));
  await formatFiles(tree);

}


export default crudGenerator;

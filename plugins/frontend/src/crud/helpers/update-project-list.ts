import { names, Tree } from '@nx/devkit';
import { FrontendGeneratorResolvedSchema } from '../schema';

const updateProjectList = async (tree: Tree, filePath: string, options: FrontendGeneratorResolvedSchema) => {

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const jsonData = JSON.parse(contents);

// Add a new record under "paths"

  jsonData.compilerOptions.paths[`@studiz/frontend/${options.fileName}-frontend-service`] = [`libs/shared/data-access/${options.fileName}/src/index.ts`];
  jsonData.compilerOptions.paths[`@studiz/admin-portal/${options.fileNamePlural}-page`] = [`libs/admin-portal/pages/${options.fileNamePlural}/src/index.ts`];
// Convert the modified JSON back to a string
  const result = JSON.stringify(jsonData, null, 2);


  tree.write(filePath, result);
};

export default updateProjectList;

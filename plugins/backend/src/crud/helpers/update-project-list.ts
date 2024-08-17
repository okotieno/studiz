import { names, Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';

const updateProjectList = async (tree: Tree, filePath: string, options: BackendGeneratorResolvedSchema) => {

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const fileName = names(options.name).fileName;
  const jsonData = JSON.parse(contents);

// Add a new record under "paths"

  jsonData.compilerOptions.paths[`@studiz/backend/${fileName}-service`] = [`libs/backend/services/${fileName}/src/index.ts`];
  jsonData.compilerOptions.paths[`@studiz/backend/${fileName}`] = [`libs/backend/${fileName}/src/index.ts`];
// Convert the modified JSON back to a string
  const result = JSON.stringify(jsonData, null, 2);


  tree.write(filePath, result);
};

export default updateProjectList;

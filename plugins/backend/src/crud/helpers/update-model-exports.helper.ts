import { Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updateModelExports = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `libs/${options.backendProjectName}/db/src/lib/models/index.ts`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();

  const exportDeclarationsLength = tsquery.query(contents, `ExportDeclaration`).length;

  const selector = `ExportDeclaration:nth-child(${exportDeclarationsLength})`;

  const result = tsquery.replace(contents, selector, (node) => {
    return `${node.getFullText()}
     export * from './${options.fileName}.model'`;
  });

  tree.write(filePath, result);
};

export default updateModelExports;

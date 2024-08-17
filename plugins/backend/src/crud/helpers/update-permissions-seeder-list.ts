import { names, Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updatePermissionSeederList = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `libs/${options.backendProjectName}/db/src/lib/seeders/20240817110213-permissions-seeder.js`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const fileName = names(options.name).fileName;

  const enumMemberLength = tsquery.query(contents, 'VariableDeclaration:has([escapedText=items])>ArrayLiteralExpression StringLiteral').length;
  const selector = `VariableDeclaration:has([escapedText=items])>ArrayLiteralExpression StringLiteral:nth-child(${enumMemberLength})`;

  const result = tsquery.replace(contents, selector, (node) => {
    const toInsert = `, '${fileName}'`;
    return node.getFullText() + toInsert;
  });

  tree.write(filePath, result);
};

export default updatePermissionSeederList;

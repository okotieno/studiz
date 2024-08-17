import { names, Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updateDbModuleImports = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `libs/${options.backendProjectName}/db/src/lib/db.module.ts`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const className = names(options.name).className;

  const importDeclarationsLength = tsquery.query(contents, `ImportDeclaration:has([text='./models']) Identifier`).length;
  const selector = `ImportDeclaration:has([text='./models']) ImportSpecifier:nth-child(${importDeclarationsLength}) Identifier`;

  let result = tsquery.replace(contents, selector, (node) => {
    return `${node.getFullText()}, ${className}Model`;
  });
  //
  result = tsquery.replace(
    result,
    `ArrayLiteralExpression PropertyAssignment:has(Identifier[name=models])>ArrayLiteralExpression :last-child Identifier:last-child` ,
    (node) => {
      const toInsert = `,
      ${className}Model
    `;
      return `${node.getFullText()}${toInsert}`;
    });

  tree.write(filePath, result);
};

export default updateDbModuleImports;

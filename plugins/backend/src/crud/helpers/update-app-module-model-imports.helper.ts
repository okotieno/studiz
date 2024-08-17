import { names, Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updateAppModuleImports = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `apps/${options.backendProjectName}/src/app/app.module.ts`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const fileName = names(options.name).fileName;
  const className = names(options.name).className;

  const importDeclarationsLength = tsquery.query(contents, 'ImportDeclaration').length;
  const selector = `ImportDeclaration:nth-child(${importDeclarationsLength})`;

  let result = tsquery.replace(contents, selector, (node) => {

    const toInsert = `
    import { ${className}Module } from '@studiz/backend/${fileName}';
    `;
    return node.getFullText() + toInsert;
  });
  //
  result = tsquery.replace(
    result,
    `PropertyAssignment:has(Identifier[name=imports])>ArrayLiteralExpression Identifier[escapedText=DbModule]`,
    (node) => {
      const toInsert = `,
      ${className}Module
    `;
      return `${node.getFullText()}${toInsert}`;
    });

  tree.write(filePath, result);
};

export default updateAppModuleImports;

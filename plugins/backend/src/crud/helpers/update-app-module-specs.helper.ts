import { Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updateAppModuleSpecs = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `apps/${options.backendProjectName}/src/app/app.module.spec.ts`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();


  const importDeclarationsLength = tsquery.query(contents, 'ImportDeclaration').length;
  const selector = `ImportDeclaration:nth-child(${importDeclarationsLength})`;

  let result = tsquery.replace(contents, selector, (node) => {

    const toInsert = `
    import { ${options.className}Module } from '@studiz/backend/${options.fileName}-backend';
    `;
    return node.getFullText() + toInsert;
  });
  //
  result = tsquery.replace(
    result,
    `CallExpression:has([escapedText=describe])`,
    (node) => {
      const toInsert = `
      jest.mock('@studiz/backend/${options.fileName}-backend', () => ({
        ${options.className}Module: class ${options.className}ModuleMock {}
      }));
    `;

      return `
      ${toInsert}
      ${node.getFullText()}`;
    });

  result = tsquery.replace(
    result,
    `CallExpression:has([escapedText=describe]) ExpressionStatement:has([escapedText=it]):last-child`,
    (node) => {

      const toInsert = `

      it('should inject ${options.className}Module', () => {
        const ${options.propertyName}Module = app.get<${options.className}Module>(${options.className}Module);
        expect(${options.propertyName}Module).toBeDefined();
      });

    `;

      return `
      ${node.getFullText()}
      ${toInsert}
      `;

    });

  tree.write(filePath, result);
};

export default updateAppModuleSpecs;

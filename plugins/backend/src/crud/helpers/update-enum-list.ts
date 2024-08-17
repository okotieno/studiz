import { names, Tree } from '@nx/devkit';
import { BackendGeneratorResolvedSchema } from '../schema';
import { tsquery } from '@phenomnomnominal/tsquery';

const updatePermissionEnumList = async (tree: Tree, options: BackendGeneratorResolvedSchema) => {

  const filePath = `libs/${options.backendProjectName}/services/permission/src/lib/enums/permission.enum.ts`;

  const fileEntry = tree.read(filePath);
  const contents = fileEntry.toString();
  const fileName = names(options.name).fileName;
  const className = names(options.name).className;

  const enumMemberLength = tsquery.query(contents, 'EnumMember').length;
  const selector = `EnumMember:nth-child(${enumMemberLength})`;

  const result = tsquery.replace(contents, selector, (node) => {
    const toInsert = `,

      Create${className} = 'create ${fileName}',
      Delete${className} = 'delete ${fileName}',
      Update${className} = 'update ${fileName}'
    `;
    return node.getFullText() + toInsert;
  });

  tree.write(filePath, result);
};

export default updatePermissionEnumList;

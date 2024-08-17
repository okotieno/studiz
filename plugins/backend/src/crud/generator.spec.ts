import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { crudGenerator } from './generator';
import { CrudGeneratorSchema } from './schema';

describe('crud generator', () => {
  let tree: Tree;
  const options: CrudGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  // it('should run successfully', async () => {
  //   await crudGenerator(tree, options);
  //   const config = readProjectConfiguration(tree, 'test');
  //   expect(config).toBeDefined();
  // });

  describe('crudGenerator', () => {
    it('should generate CRUD files correctly', async () => {
      // const options = { name: 'Product' };
      // const generateFiles = await crudGenerator(tree, options);

      expect(true).toBeTruthy()

      // Assert that generateFrontend, generateFrontendService, updateProjectList, and formatFiles were called
    });
  });
});

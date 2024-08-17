import { Test, TestingModule } from '@nestjs/testing';
import { CrudAbstractService } from './crud-abstract.service';
import { Model } from 'sequelize-typescript';
import { QueryOperatorEnum, SortByDirectionEnum, UserModel } from '@studiz/backend/db';
import { Inject } from '@nestjs/common';
import { Op } from 'sequelize';

class MockModel extends Model {
}

class TestService extends CrudAbstractService<MockModel> {
  constructor(@Inject('MOCK_MODEL_REPOSITORY') repository: typeof UserModel) {
    super(repository);
  }
}

const modelRepositoryMock = {
  findAndCountAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  bulkCreate: jest.fn()
};

describe('CrudAbstractService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: 'MOCK_MODEL_REPOSITORY',
          useValue: modelRepositoryMock
        }
      ]
    }).compile();

    service = module.get<TestService>(TestService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAndCountAll with correct parameters', async () => {
      modelRepositoryMock.findAndCountAll.mockReturnValue({
        rows: [],
        count: 0
      });
      const query = {
        currentPage: 1,
        pageSize: 10,
        sortBy: 'id',
        sortByDirection: SortByDirectionEnum.ASC,
        filters: [
          { operator: QueryOperatorEnum.Equals, field: 'field1', value: '1', values: [] },
          { operator: QueryOperatorEnum.Contains, field: 'field2', value: '2', values: [] },
          { operator: QueryOperatorEnum.LessThan, field: 'field3', value: '10', values: [] },
          { operator: QueryOperatorEnum.GreaterThan, field: 'field4', value: '4', values: [] },
          { operator: QueryOperatorEnum.In, field: 'field5', value: '1,2,3,4', values: [] },
          { operator: QueryOperatorEnum.In, field: 'field6', value: '', values: ['1', '2'] },
          { operator: QueryOperatorEnum.Between, field: 'field7', value: '1,4', values: [] }
        ]
      };
      await service.findAll(query);
      expect(modelRepositoryMock.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 10,
          offset: 0,
          order: [['id', 'ASC']],
          where: {
            field1: '1',
            field2: { [Op.iLike]: '%2%' },
            field3: { [Op.lt]: '10' },
            field4: { [Op.gt]: '4' },
            field5: { [Op.in]: ['1','2','3','4'] },
            field6: { [Op.in]: ['1', '2'] },
            field7: { [Op.between]: ['1', '4'] }
          }
        })
      );
    });
  });

  describe('findById', () => {
    it('should call findOne with correct ID', async () => {
      await service.findById(1);
      expect(modelRepositoryMock.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 }
        })
      );
    });

    it('should return null if ID is not provided', async () => {
      const result = await service.findById(undefined);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should call create with correct parameters', async () => {
      modelRepositoryMock.create.mockReturnValue({
        save: jest.fn()
      });
      const params = { name: 'Test' };
      await service.create(params);
      expect(modelRepositoryMock.create).toHaveBeenCalledWith(params, {});
    });
  });

  describe('update', () => {
    it('should call findOne and update with correct parameters', async () => {
      modelRepositoryMock.findOne.mockReturnValue({
        update: modelRepositoryMock.update
      });
      const input = { name: 'Updated Test' };
      await service.update({ input, id: 1 });
      expect(modelRepositoryMock.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 }
        })
      );
      expect(modelRepositoryMock.update).toHaveBeenCalledWith(input);
    });
  });

  describe('deleteById', () => {
    it('should call destroy with correct ID', async () => {
      await service.deleteById(1);
      expect(modelRepositoryMock.destroy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 }
        })
      );
    });

    it('should return message if ID is not provided', async () => {
      const result = await service.deleteById(undefined);
      expect(result).toEqual({ message: 'No id provided' });
    });
  });

  describe('bulkCreate', () => {
    it('should call bulkCreate with correct parameters', async () => {
      const params = [{ name: 'Item 1' }, { name: 'Item 2' }];
      await service.bulkCreate(params);
      expect(modelRepositoryMock.bulkCreate).toHaveBeenCalledWith(params);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PermissionBackendService } from '@studiz/backend/permission-backend-service';
import { CreatePermissionInputDto } from '../dto/create-permission-input.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PermissionCreatedEvent } from '../events/permission-created.event';
import { PermissionModel } from '@studiz/backend/db';
import { I18nService } from 'nestjs-i18n';
import { PermissionResolver } from './permission.resolver';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;
  let permissionService: PermissionBackendService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionResolver,
        {
          provide: I18nService,
          useValue: {},
        },
        {
          provide: PermissionBackendService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
    permissionService = module.get<PermissionBackendService>(
      PermissionBackendService
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPermission', () => {
    it('should create a permission and emit event', async () => {
      const createPermissionInput: CreatePermissionInputDto = {
        name: 'john',
      } as CreatePermissionInputDto;
      const createdPermission = { id: 1, name: 'john' } as PermissionModel;
      jest
        .spyOn(permissionService, 'create')
        .mockResolvedValueOnce(createdPermission);

      const result = await resolver.createPermission(createPermissionInput);

      expect(result).toEqual({
        message: 'Successfully created permission',
        data: createdPermission,
      });
      expect(permissionService.create).toHaveBeenCalledWith(
        createPermissionInput
      );
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'permission.created',
        expect.any(PermissionCreatedEvent)
      );
    });
  });
});

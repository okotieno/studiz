import { Test, TestingModule } from '@nestjs/testing';
import { RoleBackendService } from '@studiz/backend/role-service';
import { CreateRoleInputDto } from '../dto/create-role-input.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoleCreatedEvent } from '../events/role-created.event';
import { RoleModel } from '@studiz/backend/db';
import { I18nService } from 'nestjs-i18n';
import { RoleResolver } from './role.resolver';

describe('RoleResolver', () => {
  let resolver: RoleResolver;
  let roleService: RoleBackendService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: I18nService,
          useValue: {},
        },
        {
          provide: RoleBackendService,
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

    resolver = module.get<RoleResolver>(RoleResolver);
    roleService = module.get<RoleBackendService>(RoleBackendService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createRole', () => {
    it('should create a role and emit event', async () => {
      const createRoleInput: CreateRoleInputDto = {
        name: 'john',
      } as CreateRoleInputDto;
      const createdRole = { id: 1, name: 'john' } as RoleModel;
      jest.spyOn(roleService, 'create').mockResolvedValueOnce(createdRole);

      const result = await resolver.createRole(createRoleInput);

      expect(result).toEqual({
        message: 'Successfully created role',
        data: createdRole,
      });
      expect(roleService.create).toHaveBeenCalledWith(createRoleInput);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'role.created',
        expect.any(RoleCreatedEvent)
      );
    });
  });
});

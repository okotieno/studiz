import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionRequestBackendService } from '@studiz/backend/institution-request-service';
import { CreateInstitutionRequestInputDto } from '../dto/create-institution-request-input.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionRequestCreatedEvent } from '../events/institution-request-created.event';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { I18nService } from 'nestjs-i18n';
import { InstitutionRequestResolver } from './institution-request.resolver';

describe('InstitutionRequestResolver', () => {
  let resolver: InstitutionRequestResolver;
  let institutionRequestService: InstitutionRequestBackendService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionRequestResolver,
        {
          provide: I18nService,
          useValue: {},
        },
        {
          provide: InstitutionRequestBackendService,
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

    resolver = module.get<InstitutionRequestResolver>(
      InstitutionRequestResolver
    );
    institutionRequestService = module.get<InstitutionRequestBackendService>(
      InstitutionRequestBackendService
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createInstitutionRequest', () => {
    it('should create a institution-request and emit event', async () => {
      const createInstitutionRequestInput: CreateInstitutionRequestInputDto = {
        name: 'john',
      } as CreateInstitutionRequestInputDto;
      const createdInstitutionRequest = {
        id: 1,
        name: 'john',
      } as InstitutionRequestModel;
      jest
        .spyOn(institutionRequestService, 'create')
        .mockResolvedValueOnce(createdInstitutionRequest);

      const result = await resolver.createInstitutionRequest(
        createInstitutionRequestInput
      );

      expect(result).toEqual({
        message: 'Successfully created institution-request',
        data: createdInstitutionRequest,
      });
      expect(institutionRequestService.create).toHaveBeenCalledWith(
        createInstitutionRequestInput
      );
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'institution-request.created',
        expect.any(InstitutionRequestCreatedEvent)
      );
    });
  });
});

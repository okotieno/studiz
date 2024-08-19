import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InstitutionRequestService } from './institution-request.service';
import {
  ICreateInstitutionRequestGQL,
  IDeleteInstitutionRequestByIdGQL,
  IGetInstitutionRequestByIdGQL,
  IGetInstitutionRequestsGQL,
  IUpdateInstitutionRequestGQL,
} from './schemas/institution-request.generated';
import { MutationResult } from 'apollo-angular';
import { QueryResult } from '@apollo/client';

const createInstitutionRequestGQLMock = {
  mutate: jest.fn(() =>
    of({
      data: {
        createInstitutionRequest: { id: 1, name: 'Test InstitutionRequest' },
      },
    } as MutationResult)
  ),
};

const deleteInstitutionRequestByIdGQLMock = {
  mutate: jest.fn(() =>
    of({
      data: { deleteInstitutionRequest: { message: 'Item deleted' } },
    } as MutationResult)
  ),
};
const getInstitutionRequestByIdGQLMock = {
  fetch: jest.fn(() =>
    of({
      data: { institutionRequest: { id: 1, name: 'InstitutionRequest 1' } },
    } as QueryResult)
  ),
};
const getInstitutionRequestsGQLMock = {
  fetch: jest.fn(() =>
    of({
      data: {
        institutionRequests: {
          items: [{ id: 1, name: 'InstitutionRequest 1' }],
          meta: { totalItems: 1 },
        },
      },
    } as QueryResult)
  ),
};
const updateInstitutionRequestGQLMock = {
  mutate: jest.fn(() =>
    of({
      data: { updateInstitutionRequest: { message: 'Item deleted' } },
    } as MutationResult)
  ),
};

describe('InstitutionRequestService', () => {
  let service: InstitutionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InstitutionRequestService,
        {
          useValue: createInstitutionRequestGQLMock,
          provide: ICreateInstitutionRequestGQL,
        },
        {
          useValue: deleteInstitutionRequestByIdGQLMock,
          provide: IDeleteInstitutionRequestByIdGQL,
        },
        {
          useValue: getInstitutionRequestByIdGQLMock,
          provide: IGetInstitutionRequestByIdGQL,
        },
        {
          useValue: getInstitutionRequestsGQLMock,
          provide: IGetInstitutionRequestsGQL,
        },
        {
          useValue: updateInstitutionRequestGQLMock,
          provide: IUpdateInstitutionRequestGQL,
        },
      ],
    });
    service = TestBed.inject(InstitutionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a institution-request', (done) => {
    const institutionRequestDetails = { name: 'Test InstitutionRequest' };
    service.createItem(institutionRequestDetails).subscribe({
      next: (result) => {
        expect(result).toEqual({ id: 1, name: 'Test InstitutionRequest' });
        done();
      },
    });
  });

  it('should get institution-requests', (done) => {
    service.getItems({}).subscribe({
      next: (result) => {
        expect(result).toEqual({
          meta: { totalItems: 1 },
          items: [{ id: 1, name: 'InstitutionRequest 1' }],
        });
        done();
      },
    });
  });

  it('should get institution-request by id', (done) => {
    service.getItemWithId(1).subscribe({
      next: (result) => {
        expect(result).toEqual({ id: 1, name: 'InstitutionRequest 1' });
        done();
      },
    });
  });
});

import { Injectable } from '@angular/core';
import {
  ICreateInstitutionRequestGQL,
  IDeleteInstitutionRequestByIdGQL,
  IGetInstitutionRequestByIdGQL,
  IGetInstitutionRequestsGQL,
  IUpdateInstitutionRequestGQL,
} from './schemas/institution-request.generated';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';
import { CrudService } from '@studiz/frontend/list-page';

@Injectable({
  providedIn: 'root',
})
export class InstitutionRequestService extends CrudService<IInstitutionRequestModel> {
  entity = 'institution-request';

  constructor(
    getInstitutionRequestsGQL: IGetInstitutionRequestsGQL,
    createInstitutionRequestGQL: ICreateInstitutionRequestGQL,
    updateInstitutionRequestGQL: IUpdateInstitutionRequestGQL,
    getInstitutionRequestByIdGQL: IGetInstitutionRequestByIdGQL,
    deleteInstitutionRequestByIdGQL: IDeleteInstitutionRequestByIdGQL
  ) {
    super(
      getInstitutionRequestsGQL,
      getInstitutionRequestByIdGQL,
      createInstitutionRequestGQL,
      updateInstitutionRequestGQL,
      deleteInstitutionRequestByIdGQL
    );
  }
}

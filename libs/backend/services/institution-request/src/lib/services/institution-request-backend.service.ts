import { Injectable } from '@nestjs/common';
import { CrudAbstractService } from '@studiz/backend/crud-abstract';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class InstitutionRequestBackendService extends CrudAbstractService<InstitutionRequestModel> {
  constructor(
    @InjectModel(InstitutionRequestModel)
    private institutionRequestModel: typeof InstitutionRequestModel
  ) {
    super(institutionRequestModel);
  }
}

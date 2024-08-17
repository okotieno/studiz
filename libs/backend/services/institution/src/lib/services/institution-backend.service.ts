import { Injectable } from '@nestjs/common';
import { CrudAbstractService } from '@studiz/backend/crud-abstract';
import { InstitutionModel } from '@studiz/backend/db';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class InstitutionBackendService extends CrudAbstractService<InstitutionModel> {
  constructor(
    @InjectModel(InstitutionModel)
    private institutionModel: typeof InstitutionModel
  ) {
    super(institutionModel);
  }
}

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

  async findPendingRequest(adminEmail: string, institutionName: string): Promise<InstitutionRequestModel | null> {
    // Replace with your actual query logic
    return this.repository.findOne({
      where: {
        adminEmail: adminEmail,
        institutionName: institutionName,
        status: 'PENDING'
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CrudAbstractService } from '@studiz/backend/crud-abstract';
import { PermissionModel } from '@studiz/backend/db';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()

export class PermissionBackendService extends CrudAbstractService<PermissionModel> {
  constructor(
    @InjectModel(PermissionModel) repository: typeof PermissionModel
  ) {
    super(repository);
  }
}

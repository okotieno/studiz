import { Injectable } from '@nestjs/common';
import { CrudAbstractService } from '@studiz/backend/crud-abstract';
import { RoleModel, RoleUserModel } from '@studiz/backend/db';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()

export class RoleBackendService extends CrudAbstractService<RoleModel> {
  constructor(
    @InjectModel(RoleModel) private roleModel: typeof RoleModel,
    @InjectModel(RoleUserModel) private roleUserModel: typeof RoleUserModel,
  ) {
    super(roleModel);
  }

  async getUserRoles(userId: number) {

    const userRoles = await this.roleUserModel.findAll({
      where: { userId },
      attributes: ['roleId']
    });

    const roleIds = userRoles.map(ur => ur.roleId);
    if (roleIds.length > 0) {
      return this.roleModel.findAll({
        where: {
          id: roleIds
        },
        include: ['permissions']
      });
    } else {
      return [];
    }
  }
}

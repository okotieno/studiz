import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudAbstractService } from '@studiz/backend/crud-abstract';
import {
  PermissionModel,
  RoleModel,
  UserModel,
} from '@studiz/backend/db';
import { WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()

export class UserBackendService extends CrudAbstractService<UserModel> {
  constructor(
    @InjectModel(UserModel) repository: typeof UserModel,
  ) {
    super(repository);
  }

  async findByEmail(email: string, whereOptions?: WhereOptions<UserModel>): Promise<UserModel | null> {
    const where = { ...whereOptions, email };
    return this.repository.findOne({ where });
  }


  async getUserPermissions(email: string) {
    const user = await this.repository.findOne({
      where: { email },
      include: [{
        model: RoleModel, include: [PermissionModel]
      }]
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Extract permissions from roles
    const permissions = user.roles?.reduce((prev, { permissions }) => [...prev, ...permissions], [] as PermissionModel[]);

    return Array.from(new Set(permissions)); // Remove duplicates
  }
}

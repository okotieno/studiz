import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';

@Table({

  tableName: 'role_user',
  underscored: true,
  paranoid: false,
  timestamps: true,
  deletedAt: false
})
export class RoleUserModel extends Model {
  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  user!: UserModel

  @ForeignKey(() => RoleModel)
  @Column
  roleId!: number;

  role!: RoleModel
}

import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { PermissionModel } from './permission.model';
import { UserModel } from './user.model';

@Table({
  tableName: 'roles',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true
})
export class RoleModel extends Model {

  @Column
  name?: string;

  @BelongsToMany(() => PermissionModel, {
    foreignKeyConstraint: true,
    through: 'permission_role',
    foreignKey: 'role_id',
    otherKey: 'permission_id'
  })
  permissions!: PermissionModel[];

  @BelongsToMany(() => UserModel, {
    foreignKeyConstraint: true,
    through: 'role_user',
    foreignKey: 'role_id',
    otherKey: 'user_id'
  })
  users!: UserModel[];

}

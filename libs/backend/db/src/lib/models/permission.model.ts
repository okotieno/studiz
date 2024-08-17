import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';

@Table({
  tableName: 'permissions',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true
})
export class PermissionModel extends Model {

  @Column
  name?: string;

  @BelongsToMany(() => RoleModel, {
    foreignKeyConstraint: true,
    through: 'permission_role',
    foreignKey: 'permission_id',
    otherKey: 'role_id'
  })
  roles!: RoleModel[];

}

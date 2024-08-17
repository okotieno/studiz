import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { DataTypes } from 'sequelize';
// import { CountryModel } from './country.model';

@Table({
  tableName: 'users',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true
})
export class UserModel extends Model {

  @Column({ allowNull: false })
  firstName?: string;

  @Column({ allowNull: false })
  lastName?: string;

  @Column({ unique: true, allowNull: false })
  email?: string;

  @Column
  phone?: string;

  @Column({ type: DataTypes.DATE})
  emailVerifiedAt?: string;

  @Column({ type: DataTypes.DATE})
  phoneVerifiedAt?: string;

  @Column
  profilePhotoLink?: string;

  @BelongsToMany(() => RoleModel, {
    foreignKeyConstraint: true,
    through: 'role_user',
    foreignKey: 'user_id',
    otherKey: 'role_id'
  })
  roles!: RoleModel[];

  // @BelongsToMany(() => CountryModel, {
  //   foreignKeyConstraint: true,
  //   through: 'country_language_user',
  //   foreignKey: 'user_id',
  //   otherKey: 'country_id'
  // })

  // countries!: CountryModel[];


}

import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'institution_requests',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true,
})
export class InstitutionRequestModel extends Model {
  @Column({
    allowNull: false,
  })
  institutionName?: string;

  @Column({
    allowNull: false,
  })
  adminEmail?: string;

  @Column({ defaultValue: 'PENDING', type: DataTypes.ENUM('PENDING', 'COMPLETED') })
  status?: string;

  @Column({
    type: DataTypes.JSON
  })
  progressData?: string;

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  })
  slug?: string;
}

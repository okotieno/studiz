import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'institution_requests',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true,
})
export class InstitutionRequest1Model extends Model {
  @Column({
    allowNull: false,
  })
  institutionName?: string;

  @Column({
    allowNull: false,
  })
  adminEmail?: string;
}

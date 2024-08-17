import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'institution-requests',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true,
})
export class InstitutionRequestModel extends Model {
  @Column
  name?: string;
}

import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'institutions',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true,
})
export class InstitutionModel extends Model {
  @Column
  name?: string;
}

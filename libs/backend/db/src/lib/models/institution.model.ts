import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { FileUploadModel } from './file-upload.model';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'institutions',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true
})
export class InstitutionModel extends Model {
  @Column
  name?: string;

  @ForeignKey(() => FileUploadModel)
  @Column({ type: DataTypes.INTEGER, allowNull: true })
  logoFileUploadId?: number;

  @BelongsTo(() => FileUploadModel)
  logoFileUpload?: FileUploadModel;
}

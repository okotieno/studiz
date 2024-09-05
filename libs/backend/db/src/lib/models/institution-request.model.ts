import { BeforeCreate, BeforeUpdate, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { FileUploadModel } from './file-upload.model';

@Table({
  tableName: 'institution_requests',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: true
})
export class InstitutionRequestModel extends Model {
  @Column({
    allowNull: false
  })
  institutionName?: string;

  @Column({
    allowNull: false
  })
  adminEmail?: string;

  @Column({ defaultValue: 'PENDING', type: DataTypes.ENUM('PENDING', 'COMPLETED') })
  status?: string;

  @Column({
    type: DataTypes.JSON
  })
  progressData?: {
    institutionInfo: { name: string, logoFileUpload?: { id: number } | null },
    adminInfos: { email: string, firstName: string, lastName: string }[]
  };

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  })
  slug?: string;

  @BeforeCreate({})
  @BeforeUpdate({})
  static setProgressData(instance: InstitutionRequestModel) {
    if (!instance.progressData) {
      instance.progressData = {
        institutionInfo: { name: String(instance.institutionName), logoFileUpload: null },
        adminInfos: []
      };
    }
    if (instance.progressData.adminInfos.length < 1 && instance.adminEmail) {
      instance.progressData.adminInfos.push({ email: instance.adminEmail, firstName: '', lastName: '' });
    }

  }
}

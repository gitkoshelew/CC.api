import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface FeatureAdminCreationAttrs {
  title: string;
  description: string;
  adminPortalFeatureStatus: boolean;
  userPortalFeatureStatus: boolean;
  mobilePortalFeatureStatus: boolean;
}

@Table({ tableName: 'feature-admin' })
export class FeatureAdmin extends Model<
  FeatureAdmin,
  FeatureAdminCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  adminPortalFeatureStatus: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  userPortalFeatureStatus: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  mobilePortalFeatureStatus: boolean;
}

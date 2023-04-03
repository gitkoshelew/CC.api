import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Create profile page', description: 'Feature title' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  isOrderEditingEnabled: string;

  @ApiProperty({
    example: 'Create profile page with avatar',
    description: 'Feature description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'false', description: 'Admin feature status flag' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  adminPortalFeatureStatus: boolean;

  @ApiProperty({ example: 'false', description: 'User feature status flag' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  userPortalFeatureStatus: boolean;

  @ApiProperty({ example: 'false', description: 'Mobile feature status flag' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  mobilePortalFeatureStatus: boolean;
}

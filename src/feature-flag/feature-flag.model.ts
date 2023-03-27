import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feature } from '../feature/feature.model';

export interface FeatureFlagCreationAttrs {
  nextFeatureStatus: boolean;
  angularFeatureStatus: boolean;
  mobileFeatureStatus: boolean;
}

@Table({ tableName: 'feature-flags' })
export class FeatureFlag extends Model<FeatureFlag, FeatureFlagCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Feature)
  @Column({ type: DataType.INTEGER })
  featureId: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  nextFeatureStatus: boolean;
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  angularFeatureStatus: boolean;
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  mobileFeatureStatus: boolean;

  @BelongsTo(() => Feature)
  feature: Feature;
}

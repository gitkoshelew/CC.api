import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feature } from '../feature/feature.model';

interface FeatureFlagCreationAttrs {
  nextJSStatus: boolean;
  nestJSStatus: boolean;
  reactNativeStatus: boolean;
  angularStatus: boolean;
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
  @BelongsTo(() => Feature)
  feature: Feature;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  nextJSStatus: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  nestJSStatus: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  reactNativeStatus: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  angularStatus: boolean;
}

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
  featureId: number;
  portal: string;
  status: boolean;
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

  @Column({ type: DataType.STRING, allowNull: false })
  portal: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  status: boolean;

  @BelongsTo(() => Feature)
  feature: Feature;
}

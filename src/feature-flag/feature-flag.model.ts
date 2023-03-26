import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feature } from '../feature/feature.model';

export enum FlagTitle {
  NestJS = 'nest',
  NextJS = 'next',
  Angular = 'angular',
  ReactNative = 'mobile',
}

export interface FeatureFlagCreationAttrs {
  title: FlagTitle;
  flagStatus: boolean;
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

  @Column({
    type: DataType.ENUM,
    values: ['nest', 'next', 'angular', 'mobile'],
  })
  title: FlagTitle;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  status: boolean;

  @BelongsTo(() => Feature)
  featureTitle: Feature;
}

import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { FeatureFlag } from '../feature-flag/feature-flag.model';

interface FeatureCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'features' })
export class Feature extends Model<Feature, FeatureCreationAttrs> {
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

  @HasOne(() => FeatureFlag)
  feature: FeatureFlag;
}

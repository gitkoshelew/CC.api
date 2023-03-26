import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}

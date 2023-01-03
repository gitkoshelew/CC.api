import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TopicCreationAttrs {
  title: string;
}

@Table({ tableName: 'Topic' })
export class Topic extends Model<Topic, TopicCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
}

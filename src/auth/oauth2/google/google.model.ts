import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface GoogleUserAttrs {
  googleId: string;
  email: string;
  displayName: string;
  photo: string;
}
@Table({ tableName: 'google-user', createdAt: false, updatedAt: false })
export class GoogleUser extends Model<GoogleUser, GoogleUserAttrs> {
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
    primaryKey: true,
  })
  googleId: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  displayName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  photo: string;
}

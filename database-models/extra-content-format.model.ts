import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ExtraContent } from ".";

@Table
export default class ExtraContentFormat extends Model<ExtraContentFormat> {
  @Column
  format: string

  @ForeignKey(() => ExtraContent)
  @Column
  extraContentId: number

  // @BelongsTo(() => ExtraContent)
  // extraContent: ExtraContent
}
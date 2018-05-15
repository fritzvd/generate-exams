import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ExtraContent } from ".";

@Table
export default class ExtraContentType extends Model<ExtraContentType> {
  @Column
  type: string;

  @ForeignKey(() => ExtraContent)
  @Column
  extraContentId: number

  @BelongsTo(() => ExtraContent)
  extraContent: ExtraContent
}

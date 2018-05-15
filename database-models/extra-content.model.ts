import { Table, Model, HasOne, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import ExtraContentType from "./extra-content-type.model";
import ExtraContentFormat from "./extra-content-type.model";
import { Assignment } from ".";

@Table
export default class ExtraContent extends Model<ExtraContent> {

  // @HasOne(() => ExtraContentType)
  // type: ExtraContentType;

  // @HasOne(() => ExtraContentFormat)
  // format: ExtraContentFormat;

  @Column
  content: string;

  @ForeignKey(() => Assignment)
  @Column
  assignmentId: number

  @BelongsTo(() => Assignment)
  assignment: Assignment

}

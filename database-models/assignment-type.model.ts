import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Assignment } from ".";

@Table
export default class AssignmentType extends Model<AssignmentType> {

  @Column
  type: string

  @BelongsTo(() => Assignment)
  assignment: Assignment

  @ForeignKey(() => Assignment)
  assignmentId: number
}

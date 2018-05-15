import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Assignment } from ".";

@Table
export default class Answer extends Model<Answer> {

  @Column
  content: string;

  @Column
  correct: boolean;

  @ForeignKey(() => Assignment)
  assignment: Assignment

  @BelongsTo(() => Assignment)
  assignmentId: number
}
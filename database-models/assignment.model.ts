import { Table, Model, Column, HasOne, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ExtraContent from "./extra-content.model";
import Answer from "./answer.model";
import AssignmentType from "./assignment-type.model";
import { Exam } from ".";

@Table
export default class Assignment extends Model<Assignment> {

  @Column
  questionText: string

  @HasOne(() => ExtraContent)
  extraContent: ExtraContent

  @HasMany(() => Answer)
  answers: Answer[]

  @HasOne(() => AssignmentType)
  type: AssignmentType

  @ForeignKey(() => Exam)
  examId: number

  @BelongsTo(() => Exam)
  exam: Exam
}
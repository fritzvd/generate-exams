import { Table, HasMany, Model, Column } from "sequelize-typescript";
import { Category, Assignment } from ".";

@Table
export default class Exam extends Model<Exam> {

  @HasMany(() => Category)
  categories: Category[]

  @HasMany(() => Assignment)
  assignments: Assignment[]

  @Column
  title: string

  @Column
  description: string
}
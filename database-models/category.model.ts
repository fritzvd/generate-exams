import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Exam } from '.';

@Table
export default class Category extends Model<Category> {
  @Column
  topic: string
  
  @Column
  percentage: number
  
  @Column
  categoryId: number

  @BelongsTo(() => Exam)
  exam: Exam

  @ForeignKey(() => Exam)
  examId: number
}

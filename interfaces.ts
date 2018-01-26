import { AssignmentType } from './assignment-types'

export interface IQuestionsFile {
  title:string
  description:string,
  categories: ICategory[],
  assignments: IAssignment[],
}

export interface ICategory {
  topic:string,
  percentage:number
  categoryId:number
}

export interface IAssignment {
  categoryId:number
  extra_content?: IExtraContent
  type: AssignmentType
  answers: IAnswer[]
  question: string
}

export interface IAnswer {
  content: string
  correct?: boolean
  aota?:boolean
}

export interface IExtraContent {
  type:string
  format:string
  content:string
}
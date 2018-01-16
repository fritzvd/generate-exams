export interface IQuestionsFile {
  title:string
  description:string,
  categories: ICategory[],
  assignments: IAssignment[],
}

export interface ICategory {
  topic:string,
  percentage:number
}

export interface IAssignment {
  type: string
  answers: IAnswer[]
  question: string
}

export interface IAnswer {
  content: string
  correct?: boolean
}
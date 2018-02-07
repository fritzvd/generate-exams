import { IQuestionsFile, IAssignment, IAnswer } from './interfaces'
import shuffle from './shuffle'
import ADocStyles from './adoc-styles'
import { AssignmentType } from './assignment-types'

const ALPHABET_START = 65
const CODE = 'code'

export default class ExamGenerator {

  private _questionsFile:IQuestionsFile
  private _adoc:any

  constructor (filename:string) {
    this._questionsFile = require(filename)
  }

  produceExam () {
    const title = `${ADocStyles.heading1} ${this._questionsFile.title}`
    const description = `${this._questionsFile.description}`
    const categoriesAssignments = this._questionsFile.categories
      .map((c) => {
        const as = this._questionsFile.assignments
          .filter(a => c.categoryId === a.categoryId)
          .map(a => this.asciifyAssignment(a))
          .join('\n\n')

        const title = `\n\n${ADocStyles.heading2} ${c.topic}`
        return [title, as].join('\n\n')
      })
    // unordered questions at the end.
    const assignments = this._questionsFile.assignments
        .filter((as) => !as.categoryId)


    return [title, description, categoriesAssignments, assignments].join('\n\n')
  }

  randomAssignment ():IAssignment {
    return this._questionsFile.assignments[Math.floor(Math.random() *       this._questionsFile.assignments.length)]
  }

  asciifyAssignment (assignment:IAssignment) {
    const answers:IAnswer[] = shuffle(assignment.answers)
    let adQuestion:string = `${ADocStyles.heading3} ${assignment.question}\n`

    if (assignment.extra_content &&
        assignment.extra_content.type === CODE) {
          let extraContent = [
            `[source,${assignment.extra_content.format}`,
            assignment.extra_content.content
          ].join('\n---\n')
      adQuestion = [
        adQuestion,
        extraContent
      ].join('\n')
    }

    let adAnswers:string = ''

    switch (assignment.type) {
      case AssignmentType.MULTIPLE_CHOICE:
        adAnswers = this.multipleChoiceFormat(answers)
      break
      case AssignmentType.TRUE_FALSE:
        adAnswers = this.multipleChoiceFormat(answers)    
      break
      case AssignmentType.AOTA:
        adAnswers = this.allOfTheAbove(answers)
      break
      default:
        adAnswers = `'''\n'''`
      break
    }
    return `${adQuestion}\n${adAnswers}`
  }

  multipleChoiceFormat(answers:IAnswer[]):string {
    let formatted = answers.map(
      (a, i) => `. ${a.content}\n`)
    return `${ADocStyles.olua}\n${formatted.join('')}\n`;
  }

  allOfTheAbove(answers:IAnswer[]):string {
    let formatted = answers
      .sort(a => (a.aota) ? 1 : -1)
      .map((a, i) => `. ${a.content}\n`)
    return `${ADocStyles.olua}\n${formatted.join('')}\n`;
  }
  
}
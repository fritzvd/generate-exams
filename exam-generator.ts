import * as ADoc from 'asciidoctor.js'

import { IQuestionsFile, IAssignment, IAnswer } from './interfaces'
import shuffle from './shuffle'
import ADocStyles from './adoc-styles'
import { AssignmentType } from './assignment-types'

const ALPHABET_START = 65;

export default class ExamGenerator {

  private _questionsFile:IQuestionsFile
  private _adoc:any

  constructor (filename:string) {
    this._questionsFile = require(filename)
    this._adoc = new ADoc
  }

  produceExam () {
    const title = `${ADocStyles.heading1} ${this._questionsFile.title}`
    const description = `${this._questionsFile.description}`
    const assignments = this._adoc.convert(
      this._questionsFile.assignments
        .map((as) => this.asciifyAssignment(as))
        .join('')
    )
    return [title, description, assignments].join('\n')
  }

  randomAssignment ():IAssignment {
    return this._questionsFile.assignments[Math.floor(Math.random() * this._questionsFile.assignments.length)]
  }

  asciifyAssignment (assignment:IAssignment) {
    const answers:IAnswer[] = shuffle(assignment.answers)
    let adQuestion:string = `${ADocStyles.heading3} ${assignment.question}\n`
    let adAnswers:string = ''

    switch (assignment.type) {
      case AssignmentType.MULTIPLE_CHOICE:
        adAnswers = this.multipleChoiceFormat(answers)
      break
      case AssignmentType.TRUE_FALSE:
        adAnswers = this.multipleChoiceFormat(answers)    
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
  
}
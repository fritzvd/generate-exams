import { IQuestionsFile, IAssignment, IAnswer, IExtraContent } from './interfaces'
import shuffle from './shuffle'
import ADocStyles from './adoc-styles'
import { AssignmentType } from './assignment-types'

const ALPHABET_START = 65

export default class ExamGenerator {
  private questionNumber = 1

  private _questionsFile:IQuestionsFile
  private _adoc:any

  constructor (filename:string) {
    this._questionsFile = require(filename)
  }

  produceExam () {
    let qNr = 1
    const title = `${ADocStyles.heading1} ${this._questionsFile.title}`
    const syntaxHighlight = `
:source-highlighter: pygments
:pygments-style: emacs`
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
        .map(a => this.asciifyAssignment(a))
        .join('\n\n')
    
    return [title, syntaxHighlight, description, categoriesAssignments, assignments].join('\n\n')
  }

  /**
   * return random assignment, remove returned assignment from possible assignments.
   */
  randomAssignment ():IAssignment {
    return this._questionsFile
            .assignments.splice(Math.floor(Math.random() * 
              this._questionsFile.assignments.length), 1)[0]
  }

  renderExtraContent (extraContent:IExtraContent) {    
    const format = `${extraContent.format}`;
    return [
      `[source, ${(format === "SASS") ? "CSS" : format}]`,
      extraContent.content
    ].join(ADocStyles.codeDelimiter) + ADocStyles.codeDelimiter
  }

  asciifyAssignment (assignment:IAssignment) {
    const answers:IAnswer[] = shuffle(assignment.answers)
    let adQuestion:string = `${ADocStyles.heading3} ${this.questionNumber}. ${assignment.question}\n`

    if (assignment.extra_content &&
        assignment.extra_content.type === AssignmentType.CODE) {
      
      adQuestion = [
        adQuestion,
        this.renderExtraContent(assignment.extra_content)
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

    this.questionNumber++

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
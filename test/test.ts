import test from 'ava'
import ExamGenerator from '../exam-generator'
import { AssignmentType } from '../assignment-types'
import { IAssignment, IAnswer } from '../interfaces';

const eg = new ExamGenerator(`${__dirname}/../../example/example.json`)

test('produces an exam', t => {
  let asciidoc = eg.produceExam()
  t.true(asciidoc.endsWith('</div>'))
})

test('returns a random assignment', t => {
  let rA1 = eg.randomAssignment()
  let rA2 = eg.randomAssignment()

  t.deepEqual(Object.keys(rA1), Object.keys(rA2))
})

test('makes asciidoc out of an assignment', t => {
  const mock:IAssignment = {
    categoryId: 0,
    answers: [{
      content: 'Answer',
      correct: false
    }],
    type: AssignmentType.OPEN,
    question: 'I am a question'
  }
  const expected = `=== I am a question\n\n'''\n'''`;
  t.is(eg.asciifyAssignment(mock), expected)
})

test('formats a multiple choice question', t => {
  const answers:IAnswer[] = [
    {
      content: 'Answer 1'
    },
    {
      content: 'Answer 2'
    }
  ]
  const result = eg.multipleChoiceFormat(answers)
  const expected = `[upperalpha]\n. Answer 1\n. Answer 2\n\n`
  t.is(result, expected)
})
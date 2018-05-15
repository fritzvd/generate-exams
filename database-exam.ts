import { Sequelize } from 'sequelize-typescript'
import {
  Answer,
  Assignment,
  AssignmentType,
  Category,
  ExtraContent,
  ExtraContentFormat,
  ExtraContentType,
  Exam } from './database-models'
import { IQuestionsFile } from './interfaces';

const sequelize = new Sequelize({
  database: 'Exams',
  dialect: 'sqlite',
  username: 'h',
  password: 'as',
  storage: './try-it.db'
})


sequelize.addModels([
  Answer,
  Assignment,
  AssignmentType,
  Category,
  ExtraContent,
  ExtraContentFormat,
  ExtraContentType,
  Exam
])

sequelize.sync()

var example:IQuestionsFile = require('../example/example.json')

// const exam = Exam
console.log('asdf')
const assignments = example.assignments.map(assignment => {
  const answers = assignment.answers.map(answer => Answer.create(answer))
  const extraContent = (assignment.extra_content) ? ExtraContent.create({
    format: ExtraContentFormat.findOrCreate({ where: {format: assignment.extra_content.format}}),
    type: ExtraContentType.findOrCreate({ where: {type: assignment.extra_content.type}}),
    content: assignment.extra_content.content
  }) : null;

  const sqlAssignment = Assignment.create({
    questionText: assignment.question,
    // extraContent: extraContent,
    // answers: answers
  })
  // sqlAssignment.$setExtraContent()
  return sqlAssignment
});
// // assignment.save();
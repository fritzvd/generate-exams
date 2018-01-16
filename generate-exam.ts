#!/usr/bin/env node

import * as yargs from 'yargs'
import ExamGenerator from './exam-generator'
import * as fs from 'fs'

const argv = yargs
  .alias('i', 'input')
  .alias('o', 'output')
  .describe('i', 'Input file. A json format file that contains questions')
  .describe('o', 'Output file. An asciidoc format exam')
  .demandOption(['i'])
  .argv

const examGen = new ExamGenerator(argv.input)

const output = fs.createWriteStream(argv.output)

output.write(examGen.produceExam())
output.close()
output.on('end', function () {
  console.log('So long and thanks for all the fish')
})
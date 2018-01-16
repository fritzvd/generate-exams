#!/usr/bin/env node

import * as yargs from 'yargs'
import ExamGenerator from './exam-generator'

const argv = yargs
  .alias('i', 'input')
  .alias('o', 'output')
  .describe('i', 'Input file. A json format file that contains questions')
  .describe('o', 'Output file. An asciidoc format exam')
  .demandOption(['i'])
  .argv

const examGen = new ExamGenerator(argv.input)
console.log(examGen.randomAssignment())
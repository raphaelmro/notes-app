const chalk = require('chalk')
const validator = require('validator')
const getNotes = require('./notes')

const msg = getNotes()

console.log(msg)
console.log(validator.isURL('htps://mead.io'))
console.log(chalk.green.bold.inverse('Success!'))
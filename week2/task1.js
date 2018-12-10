var inquirer = require('inquirer');
var chalk = require('chalk');

var questions = [
      {
        type: 'input',
        name: 'first_name',
        message: "What's your name ?"
      },
      {
        type: 'input',
        name: 'dob',
        message: "What's your year of birth ?",
      },
      {
            type: 'input',
            name: 'hometown',
            message: "What's your hometown ?",
          },
]

function convert(val){
      var today = new Date();
      return today.getFullYear() - val;
}

inquirer.prompt(questions).then(answers => {
      console.log(
            `Thank you. Hello `
            + chalk.red(answers[`first_name`])
            + `, so you are `
            + chalk.green( convert(parseInt(answers['dob']))) 
            + ` year old and from `
            + chalk.blue(answers['hometown'])
            +`.`
      );
    });
const fs = require("fs-extra")
const inquirer = require("inquirer")

async function main() {
  let text = await fs.readFile("../css/inde.css")

  const questions = [
    {
      type: 'editor',
      name: 'textToClasses',
      message: 'Please write the texts for classes',
      waitUserInput: true,
    },
  ];
  
  const answers = await inquirer.prompt(questions)

  const textToClasses = answers.textToClasses.replaceAll('\t', ' ')

  console.log(textToClasses)

  const newQuestions = [
    {
      type: 'confirm',
      name: 'continue',
      message: 'All right?',
      waitUserInput: true,
    },
  ];

  const newAnswers = await inquirer.prompt(newQuestions)

  if(!newAnswers.continue) {
    return
  }

  for(let line of textToClasses.split('\n')) {
    let haveSpace = false
    let className = ""
    let cssClass = ""
    
    for(let letterIndex in line) {
      if(haveSpace) {
        cssClass += line[letterIndex]
      }else{
        className += line[letterIndex]
      }

      if(line[letterIndex] == ' ' && !haveSpace) {
        haveSpace = true
      }

    }

    text += `.${className} {\n  ${cssClass}\n}\n\n`
  }

  await fs.writeFile("../css/inde.css", text.replaceAll(`. {\n  \n}`, ''))
}

async function a() {
  while(true) {
    await main()
  }
}

a()
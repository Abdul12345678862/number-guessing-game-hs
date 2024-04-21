#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

async function playGuessingGame() {
  let playAgain = 'y';

  while (playAgain === 'y') {
    const randomNumber: number = Math.floor(Math.random() * 10 + 1);
    let tries: number = 4;
    let won: boolean = false;

    while (tries > 0) {
      tries--;

      const answers = await inquirer.prompt([
        {
          name: "numberInput",
          type: "number",
          message: "Please guess a number (1-10): ",
        },
      ]);

      if (answers.numberInput === randomNumber) {
        won = true;
        console.log(
          chalk.green("Congratulations! You guessed the right number.")
        );
        break;
      } else if (answers.numberInput < randomNumber) {
        console.log("Your guess is too low.");
      } else if (answers.numberInput > randomNumber) {
        console.log("Your guess is too high.");
      }

      console.log("You have " + tries + " tries left.\n");
    }

    if (tries === 0 && !won) {
      console.log(
        chalk.bold.red("You Lost, You didn't guess correctly in 4 tries.")
      );
    }

    const playAgainPrompt = await inquirer.prompt([
      {
        name: "trying",
        type: "input",
        message: "Do you want to play again? (y/n): ",
      },
    ]);

    playAgain = playAgainPrompt.trying;
  }

  console.log("Thanks for playing!");
}

// Start the game
playGuessingGame();
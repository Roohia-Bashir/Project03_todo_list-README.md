#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todo_list = [];
let added_tasks = []; // Array to store added tasks
async function main() {
    let while_condition = true;
    while (while_condition === true) {
        //============Options=============
        let option = await inquirer.prompt([{
                type: 'list',
                name: 'user_option',
                message: chalk.green('Select an option:'),
                choices: [chalk.green("Add"), chalk.green("Remove")]
            }]);
        //=============Add================
        if (option.user_option === chalk.green("Add")) {
            let ans = await inquirer.prompt([{
                    type: 'input',
                    name: 'usr_ans',
                    message: chalk.yellow('Write something to add in the task list:')
                }]);
            if (ans.usr_ans !== '') {
                todo_list.push(ans.usr_ans);
                added_tasks.push(chalk.yellow(ans.usr_ans)); // Store added task in added_tasks array
                console.log(chalk.yellow('Task added:'), chalk.yellowBright(ans.usr_ans));
            }
            else {
                console.log(chalk.yellow('Please write something to add in the todo_list'));
            }
        }
        //=============Remove=============
        else if (option.user_option === chalk.green("Remove")) {
            if (todo_list.length === 0) {
                console.log(chalk.red('No tasks to remove. Please add tasks first.'));
            }
            else {
                let removeChoice = await inquirer.prompt([{
                        type: 'list',
                        name: 'remove_item',
                        message: chalk.yellow('Select item to remove:'),
                        choices: todo_list
                    }]);
                let index_to_remove = todo_list.indexOf(removeChoice.remove_item);
                if (index_to_remove >= 0) {
                    todo_list.splice(index_to_remove, 1);
                    added_tasks.splice(index_to_remove, 1); // Remove task from added_tasks array
                    console.log(chalk.red('Task removed:'), chalk.redBright(removeChoice.remove_item));
                }
            }
        }
        //================confirmation==================
        let user_ans = await inquirer.prompt([{
                type: 'confirm',
                name: 'selection',
                message: chalk.cyan('Do you want to continue?'),
                default: true
            }]);
        if (user_ans.selection === false) {
            while_condition = false;
        }
    }
    // Output added tasks in yellow color
    console.log(chalk.yellow('Added Tasks:'));
    added_tasks.forEach(task => console.log(task));
    console.log(chalk.magenta('Thank you for using todo_list'));
}
main();

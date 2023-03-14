import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

async function updateDetails(current, info) {
  try {
    const feedbacks = await inquirer.prompt([
      {
        type: "input",
        default: current.name,
        name: "name",
        message: "Whats your name?",
      },
      {
        type: "number",
        default: current.phone,
        name: "phone",
        message: "Whats your phone?",
      },
      {
        type: "list",
        default: current.age,
        name: "age",
        message: "Are an adult?",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);

    current.name = feedbacks.name;
    current.phone = feedbacks.phone;
    current.age = feedbacks.age;

    await fs.writeFileSync('db.json', JSON.stringify(info), function(err) {
        if (err) {
            console.log(err);
        }
        console.log('updated');
    });

    //queryDB(updateData);

  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

export default async function updateData(info) {
  dbFileCheck();
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "recordID",
        message: "Enter Record ID",
      },
    ]);

    let current;

    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;
        updateDetails(current, info);
      }
    });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
}

/**
 * edits data
 */

queryDB(updateData)

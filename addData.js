import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

async function createDetails(info) {
    await fs.writeFileSync('db.json', JSON.stringify(info), function(err) { //overwrites the data with current data
        if(err) {
            console.log(err)
        }
        console.log('saved!')
    })
}

export default async function addData(info) {
    try {
        const answers = await inquirer.prompt([ //inquirer helps in building interactive command line
            {
                type: 'input',
                name: 'name',
                message: 'Whats your name?',
            },
            {
                type: 'number',
                name: 'phone',
                message: 'Whats your phone?',
            },
            {
                type: 'list',
                name: 'age',
                message: 'Are you an adult?',
                choices: [
                    { name: 'Y', value: 'Adult'},
                    { name: 'N', value: 'minor'},
                ]
            }
        ]);

        const data = {
            id: uuidv4(),
            name: answers.name,
            phone: answers.phone,
            age: answers.age,
        };

        info.push(data);

        if (fs.existsSync('db.json')) {
            createDetails(info);
        } else {
            fs.appendFile('db.json', '[]', (err) => { //used to create a file if already not there, or add or append at the end of file
                if (err) {
                    console.log('Could not create db.json', err);
                    return;
                }
                createDetails(info);
            })
        }

    } catch(error) {
        console.log('Something went wrong', error);
    }
}

queryDB(addData);






/**
 * adds data to DB. it also fabricates DB file if it doesn't exist
 */
import fs from "fs";

export default function queryDB(externalFunc) {
  try {
    let info = [];
    if (fs.existsSync("db.json")) {
      fs.readFile("db.json", function (err, data) {
        info = JSON.parse(data.toString()); //toString() helps convert default return type of file "buffer"
        console.log(info);

        if (err) {
          console.log(err);
          return;
        }

        if (externalFunc && !err) {
          externalFunc(info);
          return;
        }
      });
    } else {
        if (externalFunc) {
            externalFunc(info);
            return;
        }
    }
  } catch (error) {
    console.error(`Something happended: ${error.message}`);
  }
}

/**
 * checks if a db exists and executes a function passed to it
 */

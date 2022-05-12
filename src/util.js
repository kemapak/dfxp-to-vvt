const fs = require("fs");

function readFile(fileLocation) {

    // Checks synchronously if the file exists.
    if (!fs.existsSync(fileLocation)) {
        throw new Error(fileLocation + ' does not exists!');
    }

    let data = fs.readFileSync(fileLocation, 'utf-8');

    return data.toString();
}

module.exports = readFile;

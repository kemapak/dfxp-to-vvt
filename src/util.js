const fs = require("fs");

function readFile(fileLocation) {

    // Checks synchronously if the file exists.
    if (!fs.existsSync(fileLocation)) {
        throw new Error(fileLocation + ' does not exists!');
    }

    return true;
}

module.exports = readFile;

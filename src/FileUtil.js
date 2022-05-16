const fs = require("fs");

class FileUtil {

    static readFile(fileLocation) {

        // Checks synchronously if the file exists.
        if (!fs.existsSync(fileLocation)) {
            throw new Error(fileLocation + ' does not exists!');
        }

        let data = fs.readFileSync(fileLocation, 'utf-8');

        return data.toString();
    }

    static writeFile(fileLocation, contentString) {

        fs.writeFileSync(fileLocation, contentString, 'utf-8');
    }
}

module.exports = FileUtil;

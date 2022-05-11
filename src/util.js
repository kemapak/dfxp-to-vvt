function readFile(location, fileName) {

    throw new Error(location + '/' + fileName + ' does not exists!');
}

module.exports = readFile;

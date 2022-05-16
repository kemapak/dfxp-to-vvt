const FileUtil = require('../src/FileUtil.js');

describe('Given a test file, ', () => {

    test('if a file does not exist should throw an exception', () => {
        let fileLocation = __dirname + '/asset/does-not-exists.txt';

        function wrapper() {
            FileUtil.readFile(fileLocation);
        }

        expect(wrapper).toThrow(fileLocation + ' does not exists!');
    });

    test('should return the contents of the file.', () => {
        let fileLocation = __dirname + '/asset/test.txt';

        expect(FileUtil.readFile(fileLocation)).toMatch(/This is a test text file./);
    });
});

describe('Given sample text, ', () => {

    test('should able to create a text file.', () => {

        let fileLocation = __dirname + '/asset/result.txt';
        let testString = 'This is text string.';

        FileUtil.writeFile(fileLocation, testString);

        expect(FileUtil.readFile(fileLocation)).toMatch(/This is text string./);
    });
});

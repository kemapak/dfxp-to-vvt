const readFile = require('../src/util.js');

describe('Given a test file.', () => {

    test('if a file does not exist should throw an exception', () => {
        let fileLocation = __dirname + '/asset/does-not-exists.txt';

        function wrapper() {
            readFile(fileLocation);
        }

        expect(wrapper).toThrow(fileLocation + ' does not exists!');
    });

    test('should return the contents of the file.', () => {
        let fileLocation = __dirname + '/asset/test.txt';

        expect(readFile(fileLocation)).toMatch(/This is a test text file./);
    });
});

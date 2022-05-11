const readFile = require('../src/util');

describe('Given a test file.', () => {

    test('A none existent file should an exception', () => {
        let fileLocation = 'asset/test.txt';

        function wrapper() {
            readFile(fileLocation);
        }

        expect(wrapper).toThrow(fileLocation + ' does not exists!');
    });

    test('A existent file should return true', () => {
        let fileLocation = __dirname + '/asset/test.txt';
        expect(readFile(fileLocation)).toBeTruthy();
    });
});

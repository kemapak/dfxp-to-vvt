const readFile = require('../src/util');

describe('Given a test file.', () => {

    test('A none existent file should an exception', () => {
        let location = 'asset';
        let fileName = 'test.txt';

        function wrapper() {
            readFile(location, fileName);
        }

        expect(wrapper).toThrow(location + '/' + fileName + ' does not exists!');
    });
});

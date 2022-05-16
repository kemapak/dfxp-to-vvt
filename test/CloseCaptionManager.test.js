const readFile = require("../src/util");
const CCConverter = require('../src/CloseCaptionManager');

describe('Given a DFXP file ', () => {

    test('if a file does not exist should throw an exception', () => {
        let fileLocation = __dirname + '/asset/does-not-exists.txt';

        let converter = new CCConverter();

        function wrapper() {
            converter.read(fileLocation);
        }
        expect(wrapper).toThrow(fileLocation + ' does not exists!');
    });

    test('if a file exist it should read the contents', () => {
        let fileLocation = __dirname + '/asset/test.txt';

        let converter = new CCConverter();

        expect(converter.read(fileLocation)).toMatch(/This is a test text file./);
    });

    xtest('should convert XML to JSON', () => {
        let fileLocation = __dirname + '/asset/test-dfxp.xml';

        let converter = new CCConverter();
        let xmlString = converter.read(fileLocation);

        expect(converter.convert(xmlString)).toMatch(/This is a test text file./);
    });
});

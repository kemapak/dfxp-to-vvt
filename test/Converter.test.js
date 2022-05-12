const Converter = require('../src/Converter');
const readFile = require("../src/util");

describe('Given a DFXP file ', () => {

    xtest('if a file does not exist should throw an exception', () => {
        let fileLocation = __dirname + '/asset/does-not-exists.txt';

        let converter = new Converter();

        function wrapper() {
            converter.read(fileLocation);
        }
        expect(wrapper).toThrow(fileLocation + ' does not exists!');
    });

    xtest('if a file exist it should read the contents', () => {
        let fileLocation = __dirname + '/asset/test.txt';

        let converter = new Converter();

        expect(converter.read(fileLocation)).toMatch(/This is a test text file./);
    });

    test('should convert XML ot JSON', () => {
        let fileLocation = __dirname + '/asset/test-dfxp.xml';

        let converter = new Converter();
        let xmlString = converter.read(fileLocation);
        let json = converter.convert(xmlString);

        // expect(converter.read(fileLocation)).toMatch(/This is a test text file./);
    });
});

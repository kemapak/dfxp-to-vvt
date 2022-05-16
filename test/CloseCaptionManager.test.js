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

    test('should convert XML to JSON', () => {
        let fileLocation = __dirname + '/asset/test-dfxp.xml';

        let converter = new CCConverter();
        let xmlString = converter.read(fileLocation);

        let jsonObject = [{
            "begin": "00:00:01:23",
            "end": "00:00:05:07",
            "text": ["This is", "just a test"]
        }, {
            "begin": "00:00:05:07",
            "end": "00:00:08:26",
            "text": ["Hello World", "Hello You"]
        }, {
            "begin": "00:00:08:26",
            "end": "00:00:11:12",
            "text": ["does not matter", "because this is just"]
        }, {"begin": "00:00:11:12", "end": "00:00:13:24", "text": ["a test"]}, {
            "begin": "00:00:13:24",
            "end": "00:00:16:14",
            "text": ["a long test", "very long"]
        }, {"begin": "00:00:16:14", "end": "00:00:19:01", "text": ["sample text", "big text"]}, {
            "begin": "00:00:19:01",
            "end": "00:00:23:21",
            "text": ["Lorem Ipsum", "or Ipsum Lorem"]
        }, {
            "begin": "00:00:23:21",
            "end": "00:00:26:28",
            "text": ["The good news is just a test", "You can do this"]
        }, {"begin": "00:00:26:28", "end": "00:00:30:02", "text": ["why not", "Run the test"]}, {
            "begin": "00:00:30:02",
            "end": "00:00:33:03",
            "text": ["See if it works", "If not so bad"]
        }, {
            "begin": "00:00:33:03",
            "end": "00:00:36:01",
            "text": ["don't skip any unit tests"]
        }, {
            "begin": "00:00:36:01",
            "end": "00:00:38:12",
            "text": ["TDD makes coding really fun", "If you do not write test"]
        }, {"begin": "00:00:38:12", "end": "00:00:39:14", "text": ["pressure is on"]}, {
            "begin": "00:00:39:14",
            "end": "00:00:43:24",
            "text": ["Quality is build in", "anything afterwards is just a patch"]
        }, {
            "begin": "00:00:43:24",
            "end": "00:00:45:29",
            "text": ["healthy code is small code"]
        }, {
            "begin": "00:00:45:29",
            "end": "00:00:49:07",
            "text": ["best code is no code", "TDD makes code simpler"]
        }, {
            "begin": "00:00:49:07",
            "end": "00:00:51:07",
            "text": ["You write more test code then your code"]
        }, {
            "begin": "00:00:51:07",
            "end": "00:00:53:22",
            "text": ["You should enjoy", "seeing the green"]
        }, {
            "begin": "00:00:53:22",
            "end": "00:00:56:22",
            "text": ["get existed when you see red", "This just a test file"]
        }, {"begin": "00:00:56:22", "end": "00:00:58:05", "text": ["How longer can I mumble"]}, {
            "begin": "00:00:58:05",
            "end": "00:01:01:14",
            "text": ["Sometimes, for hours", "sometimes never"]
        }, {
            "begin": "00:01:01:14",
            "end": "00:01:04:05",
            "text": ["when my code runs", "happiness"]
        }, {"begin": "00:01:04:05", "end": "00:01:06:27", "text": ["no other feeling"]}, {
            "begin": "00:01:06:27",
            "end": "00:01:10:07",
            "text": ["If it fails", "what an exitement to fix them"]
        }, {
            "begin": "00:01:10:07",
            "end": "00:01:13:15",
            "text": ["not everyone knows", "the pleasure of writing unit tests"]
        }, {"begin": "00:01:13:15", "end": "00:01:14:25", "text": ["geeks maybe."]}, {
            "begin": "00:01:14:25",
            "end": "00:01:18:18",
            "text": ["Also, please talk to your friends", "do not let them ship code"]
        }, {
            "begin": "00:01:18:18",
            "end": "00:01:23:04",
            "text": ["without unit tests", "Finally this finishing"]
        }, {
            "begin": "00:01:23:04",
            "end": "00:01:25:18",
            "text": ["For best results", "100% code coverage is a must"]
        }, {
            "begin": "00:01:25:18",
            "end": "00:01:27:13",
            "text": ["remember to plan ahead", "for extra time"]
        }, {
            "begin": "00:01:27:13",
            "end": "00:01:30:00",
            "text": ["becuase it takes time", "to write good code using TDD."]
        }];

        expect(converter.convert(xmlString)).toStrictEqual(jsonObject);
    });
});

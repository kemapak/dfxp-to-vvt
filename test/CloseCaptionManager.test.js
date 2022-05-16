const readFile = require("../src/FileUtil");
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

    test('should convert DFXP contents fragments to an array Strings.', () => {
        let fileLocation = __dirname + '/asset/test-dfxp.xml';

        let converter = new CCConverter();

        let xmlString = converter.read(fileLocation);

        let jsonObject = [
            "",
            " begin=\"00:00:01:23\" end=\"00:00:05:07\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>",
            " begin=\"00:00:01:23\" end=\"00:00:05:07\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"56.25% 5.33%\">just a test</p>",
            " begin=\"00:00:05:07\" end=\"00:00:08:26\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">Hello World</p>",
            " begin=\"00:00:05:07\" end=\"00:00:08:26\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"54.38% 5.33%\">Hello You</p>",
            " begin=\"00:00:08:26\" end=\"00:00:11:12\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"58.13% 5.33%\">does not matter</p>",
            " begin=\"00:00:08:26\" end=\"00:00:11:12\" region=\"pop2\" style=\"basic\" tts:origin=\"36.88% 84.67%\" tts:extent=\"24.38% 5.33%\">because this is just</p>",
            " begin=\"00:00:11:12\" end=\"00:00:13:24\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 84.67%\" tts:extent=\"58.13% 5.33%\">a test</p>",
            " begin=\"00:00:13:24\" end=\"00:00:16:14\" region=\"pop1\" style=\"basic\" tts:origin=\"27.5% 79.33%\" tts:extent=\"45% 5.33%\">a long test</p>",
            " begin=\"00:00:13:24\" end=\"00:00:16:14\" region=\"pop2\" style=\"basic\" tts:origin=\"33.12% 84.67%\" tts:extent=\"33.75% 5.33%\">very long</p>",
            " begin=\"00:00:16:14\" end=\"00:00:19:01\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"58.13% 5.33%\">sample text</p>",
            " begin=\"00:00:16:14\" end=\"00:00:19:01\" region=\"pop2\" style=\"basic\" tts:origin=\"35% 84.67%\" tts:extent=\"30% 5.33%\">big text</p>",
            " begin=\"00:00:19:01\" end=\"00:00:23:21\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"60% 5.33%\">Lorem Ipsum</p>",
            " begin=\"00:00:19:01\" end=\"00:00:23:21\" region=\"pop2\" style=\"basic\" tts:origin=\"33.12% 84.67%\" tts:extent=\"33.75% 5.33%\">or Ipsum Lorem</p>",
            " begin=\"00:00:23:21\" end=\"00:00:26:28\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"58.13% 5.33%\">The good news is just a test</p>",
            " begin=\"00:00:23:21\" end=\"00:00:26:28\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"56.25% 5.33%\">You can do this</p>",
            " begin=\"00:00:26:28\" end=\"00:00:30:02\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"60% 5.33%\">why not</p>",
            " begin=\"00:00:26:28\" end=\"00:00:30:02\" region=\"pop2\" style=\"basic\" tts:origin=\"35% 84.67%\" tts:extent=\"28.13% 5.33%\">Run the test</p>",
            " begin=\"00:00:30:02\" end=\"00:00:33:03\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 79.33%\" tts:extent=\"54.38% 5.33%\">See if it works</p>",
            " begin=\"00:00:30:02\" end=\"00:00:33:03\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"54.38% 5.33%\">If not so bad</p>",
            " begin=\"00:00:33:03\" end=\"00:00:36:01\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"56.25% 5.33%\">don't skip any unit tests</p>",
            " begin=\"00:00:36:01\" end=\"00:00:38:12\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 79.33%\" tts:extent=\"56.25% 5.33%\">TDD makes coding really fun</p>",
            " begin=\"00:00:36:01\" end=\"00:00:38:12\" region=\"pop2\" style=\"basic\" tts:origin=\"27.5% 84.67%\" tts:extent=\"45% 5.33%\">If you do not write test</p>",
            " begin=\"00:00:38:12\" end=\"00:00:39:14\" region=\"pop1\" style=\"basic\" tts:origin=\"40.62% 84.67%\" tts:extent=\"16.88% 5.33%\">pressure is on</p>",
            " begin=\"00:00:39:14\" end=\"00:00:43:24\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"60% 5.33%\">Quality is build in</p>",
            " begin=\"00:00:39:14\" end=\"00:00:43:24\" region=\"pop2\" style=\"basic\" tts:origin=\"23.75% 84.67%\" tts:extent=\"50.63% 5.33%\">anything afterwards is just a patch</p>",
            " begin=\"00:00:43:24\" end=\"00:00:45:29\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 84.67%\" tts:extent=\"60% 5.33%\">healthy code is small code</p>",
            " begin=\"00:00:45:29\" end=\"00:00:49:07\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"58.13% 5.33%\">best code is no code</p>",
            " begin=\"00:00:45:29\" end=\"00:00:49:07\" region=\"pop2\" style=\"basic\" tts:origin=\"33.12% 84.67%\" tts:extent=\"33.75% 5.33%\">TDD makes code simpler</p>",
            " begin=\"00:00:49:07\" end=\"00:00:51:07\" region=\"pop1\" style=\"basic\" tts:origin=\"35% 84.67%\" tts:extent=\"30% 5.33%\">You write more test code then your code</p>",
            " begin=\"00:00:51:07\" end=\"00:00:53:22\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 79.33%\" tts:extent=\"54.38% 5.33%\">You should enjoy</p>",
            " begin=\"00:00:51:07\" end=\"00:00:53:22\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"54.38% 5.33%\">seeing the green</p>",
            " begin=\"00:00:53:22\" end=\"00:00:56:22\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 79.33%\" tts:extent=\"56.25% 5.33%\">get existed when you see red</p>",
            " begin=\"00:00:53:22\" end=\"00:00:56:22\" region=\"pop2\" style=\"basic\" tts:origin=\"20% 84.67%\" tts:extent=\"58.13% 5.33%\">This just a test file</p>",
            " begin=\"00:00:56:22\" end=\"00:00:58:05\" region=\"pop1\" style=\"basic\" tts:origin=\"42.5% 84.67%\" tts:extent=\"15% 5.33%\">How longer can I mumble</p>",
            " begin=\"00:00:58:05\" end=\"00:01:01:14\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"52.5% 5.33%\">Sometimes, for hours</p>",
            " begin=\"00:00:58:05\" end=\"00:01:01:14\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"54.38% 5.33%\">sometimes never</p>",
            " begin=\"00:01:01:14\" end=\"00:01:04:05\" region=\"pop1\" style=\"basic\" tts:origin=\"27.5% 79.33%\" tts:extent=\"45% 5.33%\">when my code runs</p>",
            " begin=\"00:01:01:14\" end=\"00:01:04:05\" region=\"pop2\" style=\"basic\" tts:origin=\"40.62% 84.67%\" tts:extent=\"18.75% 5.33%\">happiness</p>",
            " begin=\"00:01:04:05\" end=\"00:01:06:27\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 84.67%\" tts:extent=\"60% 5.33%\">no other feeling</p>",
            " begin=\"00:01:06:27\" end=\"00:01:10:07\" region=\"pop1\" style=\"basic\" tts:origin=\"21.88% 79.33%\" tts:extent=\"56.25% 5.33%\">If it fails</p>",
            " begin=\"00:01:06:27\" end=\"00:01:10:07\" region=\"pop2\" style=\"basic\" tts:origin=\"20% 84.67%\" tts:extent=\"58.13% 5.33%\">what an exitement to fix them</p>",
            " begin=\"00:01:10:07\" end=\"00:01:13:15\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"58.13% 5.33%\">not everyone knows</p>",
            " begin=\"00:01:10:07\" end=\"00:01:13:15\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"54.38% 5.33%\">the pleasure of writing unit tests</p>",
            " begin=\"00:01:13:15\" end=\"00:01:14:25\" region=\"pop1\" style=\"basic\" tts:origin=\"38.75% 84.67%\" tts:extent=\"20.63% 5.33%\">geeks maybe.</p>",
            " begin=\"00:01:14:25\" end=\"00:01:18:18\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"60% 5.33%\">Also, please talk to your friends</p>",
            " begin=\"00:01:14:25\" end=\"00:01:18:18\" region=\"pop2\" style=\"basic\" tts:origin=\"21.88% 84.67%\" tts:extent=\"56.25% 5.33%\">do not let them ship code</p>",
            " begin=\"00:01:18:18\" end=\"00:01:23:04\" region=\"pop1\" style=\"basic\" tts:origin=\"20% 79.33%\" tts:extent=\"60% 5.33%\">without unit tests</p>",
            " begin=\"00:01:18:18\" end=\"00:01:23:04\" region=\"pop2\" style=\"basic\" tts:origin=\"23.75% 84.67%\" tts:extent=\"52.5% 5.33%\">Finally this finishing</p>",
            " begin=\"00:01:23:04\" end=\"00:01:25:18\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">For best results</p>",
            " begin=\"00:01:23:04\" end=\"00:01:25:18\" region=\"pop2\" style=\"basic\" tts:origin=\"33.12% 84.67%\" tts:extent=\"33.75% 5.33%\">100% code coverage is a must</p>",
            " begin=\"00:01:25:18\" end=\"00:01:27:13\" region=\"pop1\" style=\"basic\" tts:origin=\"25.62% 79.33%\" tts:extent=\"48.75% 5.33%\">remember to plan ahead</p>",
            " begin=\"00:01:25:18\" end=\"00:01:27:13\" region=\"pop2\" style=\"basic\" tts:origin=\"42.5% 84.67%\" tts:extent=\"15% 5.33%\">for extra time</p>",
            " begin=\"00:01:27:13\" end=\"00:01:30:00\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">becuase it takes time</p>",
            " begin=\"00:01:27:13\" end=\"00:01:30:00\" region=\"pop2\" style=\"basic\" tts:origin=\"31.25% 84.67%\" tts:extent=\"37.5% 5.33%\">to write good code using TDD.</p>"
        ]

        expect(converter.getContentFragments(xmlString)).toStrictEqual(jsonObject);

    });

    test('should validate if the content fragment is valid via checking begin and end parameters.', () => {

        let validFragmentString = 'begin=\"00:00:01:23\" end=\"00:00:05:07\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>';
        let invalidFragmentStringWithoutBegin = 'end=\"00:00:05:07\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>';
        let invalidFragmentStringWithoutEnd = 'begin=\"00:00:01:23\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>';
        let invalidFragmentStringWithoutBeginAndEnd = 'region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>';
        let invalidEmptyString = '';

        let converter = new CCConverter();

        expect(converter.isClosedCaptionFragmentValid(validFragmentString)).toBeTruthy();
        expect(converter.isClosedCaptionFragmentValid(invalidFragmentStringWithoutBegin)).toBeFalsy();
        expect(converter.isClosedCaptionFragmentValid(invalidFragmentStringWithoutEnd)).toBeFalsy();
        expect(converter.isClosedCaptionFragmentValid(invalidFragmentStringWithoutBeginAndEnd)).toBeFalsy();
        expect(converter.isClosedCaptionFragmentValid(invalidEmptyString)).toBeFalsy();
    });

    test('should create JavaScript object from content fragment string.', () => {

        let fragmentString = 'begin=\"00:00:01:23\" end=\"00:00:05:07\" region=\"pop1\" style=\"basic\" tts:origin=\"23.75% 79.33%\" tts:extent=\"50.63% 5.33%\">This is</p>';
        let fragmentObject = {begin: '00:00:01:23', end: '00:00:05:07', text: ['This is']};

        let converter = new CCConverter();

        expect(converter.createCCFragmentObject(fragmentString)).toStrictEqual(fragmentObject);
    });

    test('should add a content fragment to fragment collection correctly.', () => {

        let fragmentObjectOneOfOne = {begin: '00:00:01:23', end: '00:00:05:07', text: ['This is']};
        let fragmentObjectOneOfTwo = {begin: '00:00:01:23', end: '00:00:05:07', text: ['just a test']};
        let fragmentObjectOne = {begin: '00:00:01:23', end: '00:00:05:07', text: ['This is', 'just a test']};
        let fragmentObjectTwo = {begin: '00:00:05:07', end: '00:00:08:26', text: ['Hello World']};

        let initiallyEmptyFragmentCollection = [];
        let withOneFragmentCollection = [fragmentObjectOneOfOne];
        let fragmentCollectionThree = [fragmentObjectOne];

        let converter = new CCConverter();

        // Adds a new element to the collection.
        converter.addFragmentObjectToCollection(fragmentObjectOneOfOne, initiallyEmptyFragmentCollection);
        expect(initiallyEmptyFragmentCollection).toStrictEqual([fragmentObjectOneOfOne]);

        // Does not add a new element but updates the current one.
        converter.addFragmentObjectToCollection(fragmentObjectOneOfTwo, withOneFragmentCollection);
        expect((withOneFragmentCollection)).toStrictEqual([fragmentObjectOne]);

        // Adds a new element to the collection, since the begin and end parameters have different values.
        converter.addFragmentObjectToCollection(fragmentObjectTwo, fragmentCollectionThree);
        expect((fragmentCollectionThree)).toStrictEqual([fragmentObjectOne, fragmentObjectTwo]);
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

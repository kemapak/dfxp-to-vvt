const readFile = require('./util.js');

class CloseCaptionManager {

    constructor() {
    }

    read(fileLocation) {
        return readFile(fileLocation);
    }

    write() {

    }

    getBeginPropertyValue(text) {

    }

    getEndPropertyValue(text) {

    }

    getTextValue(text) {

    }

    convert(dfxpString) {
        // debugger;
        let contentFragments = this.getContentFragments(dfxpString);

        let ccCollection = [];
        for (let index = 0, maxIndex = contentFragments.length; index < maxIndex; index++) {

            let frame = contentFragments[index];

            if (!this.isClosedCaptionFragmentValid(frame)) {
                continue;
            }

            let currentCCFrame = this.createFrame(frame);

            let previousCCFrame = ccCollection[ccCollection.length - 1];
            if ((null != previousCCFrame) && (previousCCFrame.begin == currentCCFrame.begin)) {
                previousCCFrame.text.push(currentCCFrame.text[0]);
                continue;
            } else {
                ccCollection.push(currentCCFrame);
            }


        }
        let x = ccCollection;
        // debugger;

    }

    /**
     * This method checks if a fragment string is valid and has the necessary parameters.
     *
     * @param fragmentString {String}
     * @returns {Boolean}
     */
    isClosedCaptionFragmentValid(fragmentString) {

        if ((fragmentString.indexOf('begin=') >= 0) && (fragmentString.indexOf('end=') >= 0)) {
            return true;
        }

        return false;
    }

    /**
     * Create a close caption fragment in JSON from the string frame parameter.
     *
     * @param frame {String} example format: <p begin="00:00:00" end="00:00:00">text</p>
     * @returns {Object} example format: {begin: "00:00:00", end: "00:00:00", text: ["text"]}
     */
    createFrame(frame) {

        let parameterValues = frame.split('"');

        let ccFrame = {};

        ccFrame.begin = parameterValues[1];
        ccFrame.end = parameterValues[3];

        /* We create text as a collections since there could be multiple lines for the same segment/fragment. */
        ccFrame.text = [];
        ccFrame.text[0] = frame.match(/>(.*?)</)[1];

        return ccFrame;
    }

    /**
     * Return the content fragments from the DFXP string.
     * @param inputText {String}
     * @returns {*} {Array}
     */
    getContentFragments(inputText) {

        // Remove formatting characters;
        inputText = inputText.replace(/[\r\n]/g, '');

        // Get the content fragments which are in <p> tags
        let contentFragments = inputText.match(/<body><div>(.*?)<\/div><\/body>/)[1];

        // Create a content fragment from each <p> tag.
        let pCollection = contentFragments.split('<p');

        return pCollection;
    }
}

module.exports = CloseCaptionManager;

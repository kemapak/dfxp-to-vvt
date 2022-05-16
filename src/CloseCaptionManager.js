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
     * Create a close caption fragment in JSON from fragmentString parameter.
     *
     * @param fragmentString {String} example format: <p begin="00:00:00:00" end="00:00:00:00">text</p>
     * @returns {Object} example format: {begin: "00:00:00:00", end: "00:00:00:00", text: ["text"]}
     */
    createFrame(fragmentString) {

        let parameterValues = fragmentString.split('"');

        let ccFragment = {};

        // We might find other ways to do this in more robust way.
        ccFragment.begin = parameterValues[1];
        ccFragment.end = parameterValues[3];

        /* We create text as a collections since there could be multiple lines for the same segment/fragment. */
        ccFragment.text = [];
        ccFragment.text[0] = fragmentString.match(/>(.*?)</)[1];

        return ccFragment;
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

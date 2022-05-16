const readFile = require('./util.js');

class CloseCaptionManager {

    // Jest cannot handle static/utility classes so added empty constructor.
    constructor() {}

    read(fileLocation) {
        return readFile(fileLocation);
    }

    write() {

    }

    convert(dfxpString) {

        let contentFragments = this.getContentFragments(dfxpString);

        let ccCollection = [];

        for (let index = 0, maxIndex = contentFragments.length; index < maxIndex; index++) {

            if (!this.isClosedCaptionFragmentValid(contentFragments[index])) {continue;}

            let currentCCFrame = this.createCCFragmentObject(contentFragments[index]);

            this.addFragmentObjectToCollection(currentCCFrame, ccCollection);
        }
        let x = ccCollection;
        debugger;
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
     * @returns {Object} example format: {begin: "00:00:00:00", end: "00:00:00:00", text: ["text", "text", ...]}
     */
    createCCFragmentObject(fragmentString) {

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
     * This method adds a close caption Javascript object fragment to close caption collection.
     *
     * @param ccFragment {Object} example format: {begin: "00:00:00:00", end: "00:00:00:00", text: ["text", "text", ...]}
     * @param ccCollection {Array}
     */
    addFragmentObjectToCollection(ccFragment, ccCollection) {

        let previousCCFrame = ccCollection[ccCollection.length - 1];

        /* If the begin parameter has the same value as previous content fragment, it means it is a new line
            in the same fragment, update the previous member. Otherwise it is new fragment.
            Remember the text is a collection, see the data structure of a ccFragment.
         */
        if ((null != previousCCFrame) && (previousCCFrame.begin == ccFragment.begin)) {
            previousCCFrame.text.push(ccFragment.text[0]);
        } else {
            ccCollection.push(ccFragment);
        }
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

const FileUtil = require('./FileUtil.js');

class CloseCaptionManager {

    /**
     * Utility methods that reads a file and returns it's String content.
     *
     * @param fileLocation {String}
     * @returns {String}
     */
    static read(fileLocation) {
        return FileUtil.readFile(fileLocation);
    }

    /**
     * Utility methods that writes a string into a file.
     *
     * @param fileLocation {String}
     * @param contentString {String}
     */
    static write(fileLocation, contentString) {
        FileUtil.writeFile(fileLocation, contentString);
    }

    /**
     * Converts a DFXP file into a VTT file.
     *
     * @param inputFileLocation {String}
     * @param outputFileLocation {String}
     */
    static convert(inputFileLocation, outputFileLocation) {

        let dfxpString = CloseCaptionManager.read(inputFileLocation);
        let ccCollection = CloseCaptionManager.convertDfxpStringToCloseCaptionCollection(dfxpString);
        let vttString = CloseCaptionManager.convertCloseCaptionCollectionToCloseCaptionString(ccCollection);
        CloseCaptionManager.write(outputFileLocation, vttString);
    }

    /**
     * Utility method that converts a DFXP String into a JavaScript close caption collection.
     *
     * @param dfxpString {String}
     * @returns {Array}
     */
    static convertDfxpStringToCloseCaptionCollection(dfxpString) {

        let contentFragments = this.getContentFragments(dfxpString);

        let ccCollection = [];

        for (let index = 0, maxIndex = contentFragments.length; index < maxIndex; index++) {

            if (!this.isClosedCaptionFragmentValid(contentFragments[index])) {continue;}

            let currentCCFrame = this.createCCFragmentObject(contentFragments[index]);

            this.addFragmentObjectToCollection(currentCCFrame, ccCollection);
        }

        return ccCollection;
    }

    /**
     * Utility method that converts a JavaScript close caption collection into a VTT string.
     *
     * @param ccCollection {Array}
     * @returns {String}
     */
    static convertCloseCaptionCollectionToCloseCaptionString(ccCollection) {

        let newLineCharacter = '\n';
        let paragraph = newLineCharacter + newLineCharacter;
        let vvtString = 'WEBVTT' + paragraph;

        for (let ccIndex = 0, maxCcIndex = ccCollection.length; ccIndex < maxCcIndex; ccIndex++) {
            vvtString += ccIndex + newLineCharacter;
            vvtString += ccCollection[ccIndex].begin + ' --> ' + ccCollection[ccIndex].end + newLineCharacter;

            for (let textIndex = 0, textCollection = ccCollection[ccIndex].text, maxTextIndex = textCollection.length; textIndex < maxTextIndex; textIndex++) {
                vvtString += textCollection[textIndex] + newLineCharacter;
            }

            vvtString += paragraph;
        }

        return vvtString;
    }

    /**
     * Return the content fragments from the DFXP string.
     * @param inputText {String}
     * @returns {*} {Array}
     */
    static getContentFragments(inputText) {

        // Remove formatting characters;
        inputText = inputText.replace(/[\r\n]/g, '');

        // Get the content fragments which are in <p> tags
        let contentFragments = inputText.match(/<body><div>(.*?)<\/div><\/body>/)[1];

        // Create a content fragment from each <p> tag.
        let pCollection = contentFragments.split('<p');

        return pCollection;
    }

    /**
     * This method checks if a fragment string is valid and has the necessary parameters.
     *
     * @param fragmentString {String}
     * @returns {Boolean}
     */
    static isClosedCaptionFragmentValid(fragmentString) {

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
    static createCCFragmentObject(fragmentString) {

        let parameterValues = fragmentString.split('"');

        let ccFragment = {};

        /*
           We might find other ways to do this in more robust way.
           We remove the fragments and replace them with 000 milliseconds, this is not exact match but close enough.
        */
        let beginResult = parameterValues[1].split(':');
        ccFragment.begin = beginResult[0] + ':' + beginResult[1] + ':' + beginResult[2] + '.000';

        let endResult = parameterValues[3].split(':');
        ccFragment.end = endResult[0] + ':' + endResult[1] + ':' + endResult[2] + '.000';;

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
    static addFragmentObjectToCollection(ccFragment, ccCollection) {

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
}

module.exports = CloseCaptionManager;

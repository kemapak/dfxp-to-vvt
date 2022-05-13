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

    getEndPropertyValue(text){

    }

    getTextValue(text) {

    }

    convert(inputText) {
       // debugger;
        let pCollection = this.getContentFragments(inputText);

        let ccCollection = [];
        for (let index = 0, maxIndex = pCollection.length; index < maxIndex; index++) {
            let ccFrame = {};
            let frame = pCollection[index];
            if (frame.indexOf('begin=') >= 0) {
               // debugger;
                let regionIndex = 0;
                let values = frame.split('"');

                ccFrame.begin = values[1];
                ccFrame.end = values[3];
                ccFrame.text= [];
                ccFrame.text[regionIndex] = frame.match(/>(.*?)</)[1];

                // The previous member could have the same begining and end so the text we got for the this current item will be the next line.
                if (0 === ccCollection.length) {
                    ccCollection.push(ccFrame);
                    continue;
                } else {
                    let previousElement = ccCollection[ccCollection.length-1];
                    if (previousElement.begin == ccFrame.begin){
                        previousElement.text.push(ccFrame.text[regionIndex]);
                        continue;
                    } else {
                        ccCollection.push(ccFrame);
                    }
                }

             //   debugger;
            }
        }
        let x = ccCollection;
        // debugger;

    }

    /**
     * Return the content fragment from the DFXP string.
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

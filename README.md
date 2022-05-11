# dfxp_to_vvt
This is a utility that converts closed captioned files from DFXP to VVT format. It is written in JavaScript and can be 
used part of a Node application or service.

HTML5 based video tag/control uses VVT files to show closed captions. DFXP files are used by flash and some video vendors
but are not supported by HTML5 based video tags. This utility converts DFXP files to VVT format.

## DFXP
Distribution Format Exchange Profile is a timed text format in XML. It is developed by W3C you read the W3C spec 
[Timed Text Markup Language 3rd Edition](https://www.w3.org/TR/ttml1/).

## VVT
Web Video Text Tracks is developed by Web Hypertext Application Technology Working Group (WHATWG).
It is modelled after SRT (SubRip Subtitle) format. You find the W3C spec [The Web Video Text Tracks Format](https://www.w3.org/TR/webvtt1/)

## Installation
Node and NPM are prerequest and must be installed before.
- Open terminal
- Type `npm install`

## Running Tests
JEST unit testing framework is used in the project but can be replaced with any library you want.

You can run the tests in your IDE or in the command line.

To run all the test with NPM.

```sh
npm test
```

or to run a single test suite with JEST

```sh
jest /test/util.test.js
```

## Building

## License
This project is developed unter MIT license. Please [read](LICENSE) license file for more information.

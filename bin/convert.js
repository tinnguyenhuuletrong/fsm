#!/usr/bin/env node
'use strict';

var fs = require("fs")
var path = require("path")
var Lib = require("./lib")

var INPUT_FILE = null
var OUTPUT_FILE = null

// Begin processEnviroment 
for (var i = 0; i < process.argv.length; i++) {
	var key = process.argv[i]
	if (key == "-in")
		INPUT_FILE = process.argv[i + 1]
	else if (key == "-out")
		OUTPUT_FILE = process.argv[i + 1]
};

if(INPUT_FILE == null)
{
    console.log("Missing Argument\r\nRequire:\r\n\t -in <input file graphml> \r\nOptional: \r\n\t -out <output file name>")
    process.exit()    
}

// Processing
var xml = fs.readFileSync(INPUT_FILE, "utf8");
Lib.parseXml(xml, FSMData => {
	writeOutput(FSMData)
})

function writeOutput(FSMData) {
	if(OUTPUT_FILE == null) {
		var dir = path.dirname(INPUT_FILE)
		var fileName = path.basename(INPUT_FILE)
		
		OUTPUT_FILE = dir + "/" + fileName + ".json"
	}
	
	fs.writeFile(OUTPUT_FILE, JSON.stringify(FSMData))
}

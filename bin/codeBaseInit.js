#!/usr/bin/env node

'use strict';

var fs = require('fs-extra')
var path = require("path")

var MODE = "js"

var MAP_PATH = {
	"js": "js",
	"cs": "cs/FsmCodeBase/FsmCodeBase/FsmCodeBase"
}

// Begin processEnviroment 
for (var i = 0; i < process.argv.length; i++) {
	var key = process.argv[i]
	if (key == "-m")
		MODE = process.argv[i + 1]
};

const TemplateFolder = __dirname + "/../codeBase/" + MAP_PATH[MODE]

fs.copySync(TemplateFolder, "FsmCode")

console.log("Init Done!")

#!/usr/bin/env node

'use strict';

var fs = require("fs")
var path = require("path")
var Lib = require("./lib")
var doT = require('dot')

// doT Setting
doT.templateSettings = {
	evaluate: /\{\{([\s\S]+?)\}\}/g,
	interpolate: /\{\{=([\s\S]+?)\}\}/g,
	encode: /\{\{!([\s\S]+?)\}\}/g,
	use: /\{\{#([\s\S]+?)\}\}/g,
	define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
	conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
	iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
	varname: 'it',
	strip: false,
	append: true,
	selfcontained: false
};

var VALID_MODE = {
	"js": processingJS
}

var INPUT_FILE = null
var OUTPUT_FILE = "./tmp"
var MODE = "js"
var VERSION = "v1"

// Begin processEnviroment 
for (var i = 0; i < process.argv.length; i++) {
	var key = process.argv[i]
	if (key == "-in")
		INPUT_FILE = process.argv[i + 1]
	else if (key == "-out")
		OUTPUT_FILE = process.argv[i + 1]
	else if (key == "-m") {
		const val = process.argv[i + 1]
		if (VALID_MODE[val] == null) {
			console.log("Invalid Mode. Please select below: \n", Object.keys(VALID_MODE))
			process.exit()
			break;
		}
		MODE = val
	}
};

if (INPUT_FILE == null) {
	console.log("Missing Argument\r\nRequire:\r\n\t -in <input file graphml> \r\nOptional: \r\n\t -out <output file name>")
	process.exit()
}

const TemplateFolder = __dirname + "/../template/" + MODE + "/" + VERSION
console.log("[FSM-Generator] Choice Tempate Root: ", TemplateFolder)
console.log("[FSM-Generator] Begin parsing data.... \n")


// Processing
var xml = fs.readFileSync(INPUT_FILE, "utf8");
Lib.parseXml(xml, FSMData => {
	console.log("\n[FSM-Generator] End parsing data")
	VALID_MODE[MODE](FSMData)
})

function readTemplateFileContent(name) {
	return fs.readFileSync(TemplateFolder + "/" + name, "utf8");
}

function isFileExit(name) {
	return fs.existsSync(OUTPUT_FILE +  "/" + name)
}

function exportContent(name, renderFunc, data) {
	fs.writeFileSync(OUTPUT_FILE +  "/" + name, renderFunc(data))
}

function processingJS(FSMData) {
	console.log(FSMData)

	var stateLogicRender = doT.template(readTemplateFileContent("state.logic.js"))
	var stateEvalRender = doT.template(readTemplateFileContent("state.evaluate.js"))
	var stateIndexRender = doT.template(readTemplateFileContent("index.js"))

	const States = FSMData.FiniteStateMachine.State
	const Conditions = FSMData.FiniteStateMachine.Condition

	const indexData = {
		states: {}
	}
	const stateData = States.map(itm => {
		
		// update state Index
		indexData.states[itm.StateName] = 1
		if(itm.StateDefault == "true")
			indexData.default = itm.StateName


		return {
			StateName: itm.StateName,
			Fields: itm.Fields,
			_idx: itm._idx,
			Transitions: Conditions.filter(con => {
				return con.StateIDFrom == itm._idx
			}).map(con => {
				return Object.assign({}, con, {
					NextState: States[con.StateIDTo - 1].StateName
				})
			})
		}
	})


	stateData.forEach(itm => {
		const name = itm.StateName

		// State Logic Exit ignore it
		if(!isFileExit(name)) {
			exportContent(name + ".js", stateLogicRender, itm)
		}

		exportContent(name + ".evaluate.js", stateEvalRender, itm)
	})

	exportContent("index.js", stateIndexRender, indexData)
}
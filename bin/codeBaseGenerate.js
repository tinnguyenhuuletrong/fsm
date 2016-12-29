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
	"js": processingJS,
	"cs": processingCS
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

	ensureDirectory('')

	VALID_MODE[MODE](FSMData)
})

function capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function readTemplateFileContent(name) {
	return fs.readFileSync(TemplateFolder + "/" + name, "utf8");
}

function isFileExit(name) {
	return fs.existsSync(OUTPUT_FILE + "/" + name)
}

function ensureDirectory(name) {
	if (!isFileExit(name))
		fs.mkdirSync(OUTPUT_FILE + "/" + name);
}

function exportContent(name, renderFunc, data) {
	fs.writeFileSync(OUTPUT_FILE + "/" + name, renderFunc(data))
}

function camelize(str) {
	return str.replace(/\W+(.)/g, function(match, chr) {
		return chr.toUpperCase();
	});
}

function getFsmName() {
	let tmp = path.basename(INPUT_FILE)
	tmp = tmp.split('.')
	tmp.splice(-1,1)
	return capitalize(camelize(tmp.join(' ')));
}

function formatData(FSMData) {
	const States = FSMData.FiniteStateMachine.State
	const Conditions = FSMData.FiniteStateMachine.Condition

	const indexData = {
		states: {},
		FsmName: getFsmName(),
		StateDataName: getFsmName() + "StateData",
	}
	const stateData = States.map(itm => {

		// update state Index
		indexData.states[itm.StateName] = 1
		if (itm.StateDefault == "true")
			indexData.default = itm.StateName


		return {
			FsmName: getFsmName(),
			StateDataName: getFsmName() + "StateData",
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

	return {
		stateData: stateData,
		indexData: indexData
	}
}

function processingJS(FSMData) {
	console.log(FSMData)

	var stateLogicRender = doT.template(readTemplateFileContent("state.logic.js"))
	var stateEvalRender = doT.template(readTemplateFileContent("state.evaluate.js"))
	var stateIndexRender = doT.template(readTemplateFileContent("index.js"))

	const {
		stateData,
		indexData
	} = formatData(FSMData)

	stateData.forEach(itm => {
		const name = itm.StateName

		// State Logic Exit ignore it
		if (!isFileExit(name)) {
			exportContent(name + ".js", stateLogicRender, itm)
		}

		exportContent(name + ".evaluate.js", stateEvalRender, itm)
	})

	exportContent("index.js", stateIndexRender, indexData)
}

function processingCS(FSMData) {
	console.log(FSMData)

	var fsmName = getFsmName()

	ensureDirectory("Generated")
	ensureDirectory("Logic")

	var stateLogicRender = doT.template(readTemplateFileContent("Generated/StateLogic.Evaluate.cs"))
	var stateEvalRender = doT.template(readTemplateFileContent("Logic/StateLogic.cs"))
	var stateIndexRender = doT.template(readTemplateFileContent("State.Index.cs"))
	var stateDataRender = doT.template(readTemplateFileContent("State.StateData.cs"))

	const {
		stateData,
		indexData
	} = formatData(FSMData)

	stateData.forEach(itm => {
		const name = itm.StateName

		// State Logic Exit ignore it
		if (!isFileExit(name)) {
			exportContent("Generated/" + name + ".cs", stateLogicRender, itm)
		}

		exportContent("Logic/" + name + ".Evaluate.cs", stateEvalRender, itm)
	})

	exportContent(fsmName + ".Index.cs", stateIndexRender, indexData)
	exportContent(fsmName + ".StateData.cs", stateDataRender, indexData)
}
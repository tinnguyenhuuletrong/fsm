// version: V1

const util = require("util")
const Green = function (context) {
	this.context = context
}

// Partial evaluate
require("./Green.evaluate")(Green)

// ----------
// State Logic Implement Below
// ----------

Green.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

Green.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("Green - Enter")
};

Green.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("Green - Exit")
};

Green.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("Green - On Event ", args)
};

module.exports = Green
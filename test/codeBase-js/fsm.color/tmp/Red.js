// version: V1

const util = require("util")
const Red = function (context) {
	this.context = context
}

// Partial evaluate
require("./Red.evaluate")(Red)

// ----------
// State Logic Implement Below
// ----------

Red.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

Red.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("Red - Enter")
};

Red.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("Red - Exit")
};

Red.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("Red - On Event ", args)
};

module.exports = Red
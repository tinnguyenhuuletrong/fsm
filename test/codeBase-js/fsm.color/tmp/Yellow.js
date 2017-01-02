// version: V1

const util = require("util")
const Yellow = function (context) {
	this.context = context
}

// Partial evaluate
require("./Yellow.evaluate")(Yellow)

// ----------
// State Logic Implement Below
// ----------

Yellow.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

Yellow.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("Yellow - Enter")
};

Yellow.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("Yellow - Exit")
};

Yellow.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("Yellow - On Event ", args)
};

module.exports = Yellow
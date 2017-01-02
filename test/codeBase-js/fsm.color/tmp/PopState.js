// version: V1

const util = require("util")
const PopState = function (context) {
	this.context = context
}

// Partial evaluate
require("./PopState.evaluate")(PopState)

// ----------
// State Logic Implement Below
// ----------

PopState.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

PopState.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("PopState - Enter")
};

PopState.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("PopState - Exit")
};

PopState.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("PopState - On Event ", args)
};

module.exports = PopState
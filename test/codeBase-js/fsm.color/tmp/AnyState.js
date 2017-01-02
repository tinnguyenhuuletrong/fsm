// version: V1

const util = require("util")
const AnyState = function (context) {
	this.context = context
}

// Partial evaluate
require("./AnyState.evaluate")(AnyState)

// ----------
// State Logic Implement Below
// ----------

AnyState.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

AnyState.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("AnyState - Enter")
};

AnyState.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("AnyState - Exit")
};

AnyState.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("AnyState - On Event ", args)
};

module.exports = AnyState
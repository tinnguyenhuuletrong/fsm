// version: V1

const util = require("util")
const Blue = function (context) {
	this.context = context
}

// Partial evaluate
require("./Blue.evaluate")(Blue)

// ----------
// State Logic Implement Below
// ----------

Blue.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

Blue.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("Blue - Enter")
};

Blue.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("Blue - Exit")
};

Blue.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("Blue - On Event ", args)
};

module.exports = Blue
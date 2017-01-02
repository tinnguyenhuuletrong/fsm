// version: V1

const util = require("util")
const Anystate = function (context) {
	this.context = context
}

// Partial evaluate
require("./Anystate.evaluate")(Anystate)

// ----------
// State Logic Implement Below
// ----------

Anystate.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

Anystate.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("Anystate - Enter")
};

Anystate.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("Anystate - Exit")
};

Anystate.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("Anystate - On Event ", args)
};

module.exports = Anystate
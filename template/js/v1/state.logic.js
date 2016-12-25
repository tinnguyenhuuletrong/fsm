// version: V1

const util = require("util")
const {{=it.StateName}} = function (context) {
	this.context = context
}

// Partial evaluate
require("./{{=it.StateName}}.evaluate")({{=it.StateName}})

// ----------
// State Logic Implement Below
// ----------

{{=it.StateName}}.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

{{=it.StateName}}.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("{{=it.StateName}} - Enter")
};

{{=it.StateName}}.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("{{=it.StateName}} - Exit")
};

{{=it.StateName}}.prototype.OnEvent = function(stateData, args) {
	// Logic Code Here
	console.log("{{=it.StateName}} - On Event ", args)
};

module.exports = {{=it.StateName}}
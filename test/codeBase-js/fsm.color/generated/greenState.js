const util = require("util")
const BaseState = require("../../../../codeBase/js/baseState")
const GreenState = function (context) {
	this.context = context
}
util.inherits(GreenState, BaseState);

GreenState.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here
	return this._evaluate(stateData)
};

GreenState.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("GreenState - Enter")
};

GreenState.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("GreenState - Exit")
};

//Generated
GreenState.prototype._evaluate = function(stateData) {
	if(stateData.timeSinceEnter > 2000)
		return "RedState"
};

module.exports = GreenState
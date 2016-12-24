const util = require("util")
const BaseState = require("../../../../codeBase/js/baseState")
const RedState = function (context) {
	this.context = context
}
util.inherits(RedState, BaseState);

RedState.prototype.OnUpdate = function(stateData, dt) {	
	// Logic Code Here

	return this._evaluate(stateData)
};

RedState.prototype.OnEnter = function(stateData) {
	// Logic Code Here
	console.log("RedState - Enter")
};

RedState.prototype.OnExit = function(stateData) {
	// Logic Code Here
	console.log("RedState - Exit")
};

//Generated
RedState.prototype._evaluate = function(stateData) {
	if(stateData.timeSinceEnter > 2000)
		return "GreenState"
};

module.exports = RedState
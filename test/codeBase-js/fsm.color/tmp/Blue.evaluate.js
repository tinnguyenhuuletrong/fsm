const _evaluate = function(stateData) {

	if(stateData.loop && stateData.timeSinceEnter > 2000)
		return "Red"

};

module.exports = function(Blue) {
	Blue.prototype._evaluate = _evaluate
}
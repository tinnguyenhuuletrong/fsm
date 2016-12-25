const _evaluate = function(stateData) {

	if(stateData.timeSinceEnter > 2000)
		return "Green"

};

module.exports = function(Red) {
	Red.prototype._evaluate = _evaluate
}
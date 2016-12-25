const _evaluate = function(stateData) {

	if(stateData.timeSinceEnter > 2000)
		return "Blue"

};

module.exports = function(Green) {
	Green.prototype._evaluate = _evaluate
}
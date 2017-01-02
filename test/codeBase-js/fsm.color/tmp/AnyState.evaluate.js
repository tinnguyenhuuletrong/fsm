const _evaluate = function(stateData) {

	if(stateData.fireKey)
		return "Yellow"

};

module.exports = function(AnyState) {
	AnyState.prototype._evaluate = _evaluate
}
const _evaluate = function(stateData) {

	if(stateData.fireKey)
		return "Yellow"

};

module.exports = function(Anystate) {
	Anystate.prototype._evaluate = _evaluate
}
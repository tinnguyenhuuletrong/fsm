const TimePlugin = function () {
}

TimePlugin.prototype.OnUpdate = function(stateData, args) {
	const dt = args.dt || 0
	const time = stateData.timeSinceEnter || 0

	stateData.timeSinceEnter = time + dt
};

TimePlugin.prototype.OnEnter = function(stateData, args) {
	stateData.timeSinceEnter = 0
	stateData.timeEnter = Date.now
};

TimePlugin.prototype.OnExit = function(stateData, args) {
	stateData.timeSinceEnter = 0
};


module.exports = TimePlugin
const StateMachine = function (plugins = []) {
	this.stackState = []
	this.stateDB = {}
	this.plugins = plugins
	this.stateData = {}
}

StateMachine.prototype.load = function(stateDB, defaultState) {
	this.stateDB = stateDB
	this.ReplaceState(defaultState)
};

StateMachine.prototype.OnUpdate = function(dt) {
	if(this.currentState == null)
		return

	// Update Plugin
	this._pluginEvent("OnUpdate", {dt: dt})

	// Update State Transition
	const nextStateName = this.currentState.OnUpdate(this.stateData, dt)

	// Replace State
	if(nextStateName != null)
		this.ReplaceState(nextStateName)
};

StateMachine.prototype.ReplaceState = function(nextStateName) {	
	if(this.currentState) {
		this._pluginEvent("OnExit", {})
		this.currentState.OnExit(this.stateData)
	}
	
	// lookup new state
	this.currentState = this.stateDB[nextStateName]

	if(this.currentState) {
		this._pluginEvent("OnEnter", {stateName: nextStateName})
		this.currentState.OnEnter(this.stateData)
	}
};

StateMachine.prototype.OnEvent = function(name, args) {
	this._pluginEvent("OnEvent", {name: name, args: args})
};

StateMachine.prototype.AddPlugin = function(plugin) {
	this.plugins.push(plugin)
};

StateMachine.prototype._pluginEvent = function(eventName, args) {
	this.plugins.forEach(itm => {
		const fuc = itm[eventName]
		fuc && fuc(this.stateData, args)
	})
};

module.exports = StateMachine
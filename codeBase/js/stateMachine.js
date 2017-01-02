const ANY_STATE_NAME = "AnyState"
const POP_STATE_NAME = "PopState"

const StateMachine = function(plugins = []) {
	this.stackState = []
	this.stateDB = {}
	this.plugins = plugins
	this.stateData = {}
}

StateMachine.prototype.load = function(stateDB, defaultState) {
	this.stateDB = stateDB
	this.anyState = stateDB[ANY_STATE_NAME]
	this.ReplaceState(defaultState)
};

StateMachine.prototype.OnUpdate = function(dt) {
	if (this.currentState == null)
		return

	// Update Plugin
	this._pluginEvent("OnUpdate", {
		dt: dt
	})

	let operation = this.ReplaceState

	// Update State Transition following
	//	1. AnyState transitions
	//	2. State transitions

	let nextStateName = this.updateAnyState()
	if (nextStateName != null) {
		operation = this.PushState
	} else {
		nextStateName = this.currentState.OnUpdate(this.stateData, dt)
	}

	// Should Pop state
	if (nextStateName == POP_STATE_NAME)
		operation = this.PopState

	// Replace State
	if (nextStateName != null)
		operation.call(this,nextStateName)
};

StateMachine.prototype.updateAnyState = function(dt) {
	if (this.anyState == null)
		return

	return this.anyState.OnUpdate(this.stateData, dt)
};

StateMachine.prototype.ReplaceState = function(nextStateName) {
	if (this.currentState) {

		// Ignore incase same state transition
		if (this.stateDB[nextStateName] == this.currentState)
			return

		this._pluginEvent("OnExit", {})
		this.currentState.OnExit(this.stateData)

		// pop stack
		this.stackState.pop()
	}

	// lookup new state
	this.currentState = this.stateDB[nextStateName]

	if (this.currentState) {
		this._pluginEvent("OnEnter", {
			stateName: nextStateName
		})
		this.currentState.OnEnter(this.stateData)

		// push state
		this.stackState.push(this.currentState)
	}
};

StateMachine.prototype.PushState = function(nextStateName) {
	if (this.currentState) {

		// Ignore incase same state transition
		if (this.stateDB[nextStateName] == this.currentState)
			return

		this._pluginEvent("OnExit", {})
		this.currentState.OnExit(this.stateData)
	}

	// lookup new state
	this.currentState = this.stateDB[nextStateName]

	if (this.currentState) {
		this._pluginEvent("OnEnter", {
			stateName: nextStateName
		})
		this.currentState.OnEnter(this.stateData)

		// push state
		this.stackState.push(this.currentState)
	}
};

StateMachine.prototype.PopState = function(nextStateName) {
	if (this.currentState) {

		// Ignore incase same state transition
		if (this.stateDB[nextStateName] == this.currentState)
			return

		this._pluginEvent("OnExit", {})
		this.currentState.OnExit(this.stateData)

		this.stackState.pop()
	}
	
	this.currentState = this.stackState[0]

	if (this.currentState) {
		this._pluginEvent("OnEnter", {
			stateName: nextStateName
		})
		this.currentState.OnEnter(this.stateData)

		// push state
		this.stackState.push(this.currentState)
	}
};

StateMachine.prototype.OnEvent = function(name, args) {
	this._pluginEvent("OnEvent", {
		name: name,
		args: args
	})
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
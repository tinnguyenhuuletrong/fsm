"use strict";
const vm = require('vm');
const EventEmitter = require('events');

//----------------------------------------------------------------------------------------------//
class JFSMTransition {
	constructor(fromState, toState, condition) {
		this.FromState = fromState;
		this.ToState = toState;
		this.Condition = condition.ConditionValue;
		this.Script = new vm.Script(this.Condition);
	}

	eval(context) {
		if (context.VMContext == null)
			context.VMContext = new vm.createContext(context);
		return this.Script.runInContext(context.VMContext);
	}
}

//----------------------------------------------------------------------------------------------//
class JFSMState {

	constructor(id, data, fsm) {
		this.ID = id;
		this.IsDefault = data.StateDefault.toLowerCase() === "true";
		this.IsTrigger = data.StateTrigger.toLowerCase() === "true";
		this.IsFunction = data.StateFunction.toLowerCase() === "true";
		this.Name = data.StateName || ""
		this.Fields = data.Fields

		this.Fsm = fsm;

		this.Transition = []
	}

	_initTransition(rootData) {
		var Transition = rootData.Condition

		for (var index = 0; index < Transition.length; index++) {
			var element = Transition[index];
			if (+element.StateIDFrom !== this.ID)
				continue;

			var toState = this.Fsm.getStateByID(element.StateIDTo)
			this.Transition.push(new JFSMTransition(this, toState, element));
		}
	}

	update(context) {
		for (var index = 0; index < this.Transition.length; index++) {
			var element = this.Transition[index];
			if (element.eval(context))
				return element.ToState
		}
		return null;
	}
}

//----------------------------------------------------------------------------------------------//
class JFSM extends EventEmitter {
	constructor(jsonData) {
		super();
		this.State = [];
		this.Condition = []

		this.DefaultState = null;
		this.AnyState = null;
		this.CurrentState = null;

		this.EventQueue = []
		this.EventStack = []

		this._init(jsonData);
		this.reset();
	}

	_init(jsonData) {

		var States = jsonData.State

		// Step 1: Init States
		for (var index = 0; index < States.length; index++) {
			var element = States[index];
			this.State.push(new JFSMState(index + 1, element, this));
		}

		// Step 2: Load States Transition
		for (var index = 0; index < States.length; index++) {
			var element = this.State[index];
			element._initTransition(jsonData)
			if (this.DefaultState == null && element.IsDefault)
				this.DefaultState = element

			if (this.AnyState == null && element.Name === "AnyState") {
				this.AnyState = element
			}
		}
	}

	reset() {
		this.CurrentState = this.DefaultState;

		this.emit("set", this.CurrentState)
	}

	getStateByID(id) {
		for (var index = 0; index < this.State.length; index++) {
			var element = this.State[index];
			if (element.ID === +id)
				return element;
		}
		return null;
	}

	getStateByName(name) {
		for (var index = 0; index < this.State.length; index++) {
			var element = this.State[index];
			if (element.Name === name)
				return element;
		}
		return null;
	}

	setState(nextState, context) {
		if(!this.CurrentState.IsFunction)
			this.emit("exit", this.CurrentState, context)

		this.CurrentState = nextState;
		
		if(!this.CurrentState.IsFunction)
			this.emit("enter", this.CurrentState, context)
	}

	update(context) {

		//Update Event
		this.updateEvent()

		if (this.CurrentState == null)
			return;

		if (this.CurrentState.IsFunction)
			this.emit("func", this.CurrentState, context)
		else
			this.emit("update", this.CurrentState, context)

		var nextState = null

		// Check Event State has no exit path
		if (this.EventStack.length > 0
			&& this.CurrentState.Transition.length == 0) {
			this.endProcessingEvent(context)
			return
		}

		//Update AnyState
		if (this.AnyState != null)
			nextState = this.AnyState.update(context)

		//Update Normal State
		if (nextState == null)
			nextState = this.CurrentState.update(context);

		if (nextState != null) {
			this.setState(nextState, context)
		}
	}


	//----------------------------------------------------------
	//  Event 
	//----------------------------------------------------------
	updateEvent(context) {

		//Still processing Event. Waiting
		if (this.EventStack.length != 0)
			return

		//Has Pending Event ?
		if (this.EventQueue.length > 0) {
			var eventName = this.EventQueue.pop()
			var state = this.getStateByName(eventName)
			if (state != null) {
				this.beginProcessingEvent(state, context)
			}
		}
	}

	beginProcessingEvent(state, context) {
		this.EventStack.push(this.CurrentState)

		this.setState(state)

		this.emit("onEventBegin", this.CurrentState, context)
	}

	endProcessingEvent(context) {
		var preState = this.EventStack.pop()
		this.emit("onEventEnd", this.CurrentState, context)

		if (perState != null) {
			this.setState(preState)
		} else {
			this.CurrentState = null
		}
	}
}

module.exports.JFSM = JFSM;
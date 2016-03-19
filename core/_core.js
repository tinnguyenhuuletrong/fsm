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
        if(context.VMContext == null)
            context.VMContext = new vm.createContext(context);
        return this.Script.runInContext(context.VMContext);
    }
}

//----------------------------------------------------------------------------------------------//
class JFSMState {

    constructor(id, data, fsm) {
        this.ID = id;
        this.IsDefault = data.StateDefault === "True";
        this.IsTrigger = data.StateTrigger === "True";
        this.IsFunction = data.StateFunction === "True";
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
            if(element.eval(context))
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
        this.CurrentState = null;
           
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
            if(this.DefaultState == null && element.IsDefault)
                this.DefaultState = element
        }
    }
    
    reset() {
        this.CurrentState = this.DefaultState;
        
        this.emit("set", this.CurrentState)   
    }

    getStateByID(id) {
        for (var index = 0; index < this.State.length; index++) {
            var element = this.State[index];
            if(element.ID === +id)
                return element;
        }
        return null;
    }
    
    update(context) {
        if(this.CurrentState == null)
            return false;
        
        this.emit("update", this.CurrentState)
        
        var nextState = this.CurrentState.update(context);
        if(nextState != null) {
            this.emit("exit", this.CurrentState)
            
            this.CurrentState = nextState;
            
            this.emit("enter", this.CurrentState)   
        } 
    }
}

module.exports.JFSM = JFSM;
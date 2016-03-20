var assert = require('assert');
var FSM = require("..").JFSM;

var rawData = require("./data/changecolor.graphml.json")

fsm = new FSM(rawData.FiniteStateMachine);

var context = {
	Time: function() {
		return this._time
	},

	_time: 0
}

fsm.on("enter", function(state, context) {
	console.log("Enter %s", state.Name)
})

fsm.on("exit", function(state, context) {
	console.log("Exit %s", state.Name)
})

fsm.on("update", function(state, context) {
	console.log("Update %s", state.Name)
})

fsm.on("func", function(state, context) {
	var fields = state.Fields
	console.log("Func", state.Name, fields)
	
	context._time = 0
})

setInterval(() => {
	console.log("------------------")
	fsm.update(context)
	console.log("------------------")
	
	context._time++
}, 2000)
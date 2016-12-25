const StateMachine = require("../../codeBase/js/stateMachine")
const TimePlugin = require("../../codeBase/js/plugin/timePlugin")

const FSM = require("./fsm.color/tmp")

const tmp = new StateMachine(
	[new TimePlugin()]
)

// Instantiate state from FSM template
const insState = {}
const context = {}
for(var key in FSM.states) {
	insState[key] = new FSM.states[key](context)
}

tmp.load(insState, FSM.default)

setInterval( () => {  
	tmp.OnUpdate(10)
}, 10);

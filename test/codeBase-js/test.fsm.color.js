const StateMachine = require("../../codeBase/js/stateMachine")
const TimePlugin = require("../../codeBase/js/plugin/timePlugin")

const FSM = require("./fsm.color")

const tmp = new StateMachine(
	[new TimePlugin()]
)

// Instantiate state from FSM template
const insState = {}
const context = {}
for(var key in FSM) {
	insState[key] = new FSM[key](context)
}

tmp.load(insState, "RedState")

setInterval( () => {  
	tmp.OnUpdate(10)
}, 10);

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

tmp.stateData.loop = true

tmp.load(insState, FSM.default)

let count = 0
setInterval( () => {  
	tmp.OnUpdate(10)
	count++

	//console.log(count)
	if(count % 500 == 0) {
		tmp.stateData.fireKey = true
		console.log(count, "----fireKey!")
	} else 
		tmp.stateData.fireKey = false
}, 10);

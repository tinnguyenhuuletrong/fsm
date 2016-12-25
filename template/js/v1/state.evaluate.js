const _evaluate = function(stateData) {
{{ for(var prop in it.Transitions) { }}
	if({{=it.Transitions[prop].ConditionValue}})
		return "{{=it.Transitions[prop].NextState}}"
{{ } }}
};

module.exports = function({{=it.StateName}}) {
	{{=it.StateName}}.prototype._evaluate = _evaluate
}
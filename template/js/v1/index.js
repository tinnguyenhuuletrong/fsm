module.exports = {
	states: {
		{{ for(var prop in it.states) { }}
			{{=prop}}: require("./{{=prop}}"),
		{{ } }}
	},
	default: "{{=it.default}}"
}
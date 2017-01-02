module.exports = {
	states: {
		
			Red: require("./Red"),
		
			Green: require("./Green"),
		
			Blue: require("./Blue"),
		
			AnyState: require("./AnyState"),
		
			Yellow: require("./Yellow"),
		
			PopState: require("./PopState"),
		
	},
	default: "Red"
}
var parseString = require('xml2js').parseString;

function getStateByID(FSMData, id) {
	return FSMData.FiniteStateMachine.State.find(function(val, index, arr) {
		return val._id === id
	})
}

function findNode(root, findkey) {
	if (root instanceof Array) {
		for (var index = 0; index < root.length; index++) {
			var element = root[index];
			var res = findNode(element, findkey)
			if (res != null)
				return res
		}
	} else if (root instanceof Object) {

		if (root[findkey] != null)
			return root[findkey]

		for (var key in root) {
			if (root.hasOwnProperty(key)) {
				var element = root[key];
				var res = findNode(element, findkey)
				if (res != null)
					return res
			}
		}
	}
}

function parseState(RawData, FSMData) {
	try {
		var StateRoot = RawData.graphml.graph[0].node

		StateRoot.forEach(function(element) {
			var stateID = element['$']['id']
			element.data.forEach(function(stateInfo) {
				var stateData = stateInfo['y:ShapeNode']
				if (stateData == null)
					return

				var nodeLabel = stateData[0]['y:NodeLabel'][0]
				var nodeShape = stateData[0]['y:Shape'][0]
				var nodeGeo = stateData[0]['y:Geometry'][0]

				var info = nodeLabel['_'].trim().split('\r\n')
				var label = info[0]
				var shape = nodeShape["$"].type
				var isDefault = label[0] === '*'
				var isTrigger = label[0] === '+'
				var isFunction = shape === 'roundrectangle'

				if (isDefault || isTrigger)
					label = label.slice(1)

				console.log("Add State: ", label, shape, info)

				var newState = {
					"_id": stateID,
					"_idx": FSMData.FiniteStateMachine.State.length + 1,
					"StateDefault": isDefault.toString(),
					"StateTrigger": isTrigger.toString(),
					"StateFunction": isFunction.toString(),
					"X": +nodeGeo['$']['x'],
					"StateName": label,
					"Fields": []
				}

				for (var i = 1; i < info.length; i++) {
					var tmp = info[i].split('=')
					var key = tmp[0]
					var macro = tmp[1]

					var fieldData = {
						"FieldName": key,
						"Value": macro,
						"Macro": []
					}

					if (macro[0] == '{')
						fieldData.Macro.push(macro)

					newState.Fields.push(fieldData)
				}


				//Append To Data
				FSMData.FiniteStateMachine.State.push(newState)

			}, this);
		}, this);

	} catch (error) {
		throw error
	}
}

function parseCondition(RawData, FSMData) {
	try {

		var ConditionRoot = RawData.graphml.graph[0].edge

		ConditionRoot.forEach(function(element) {
			var connection = element['$']
			var fromState = getStateByID(FSMData, connection.source)
			var toState = getStateByID(FSMData, connection.target)
			if (fromState == null || toState == null)
				return

			var EdgeLabel = findNode(element, 'y:EdgeLabel')
			var condition = "true"
			if (EdgeLabel != null)
				condition = EdgeLabel[0]['_'].trim()

			console.log(connection, condition)

			var con = {
				"StateIDFrom": fromState._idx,
				"StateIDTo": toState._idx,
				"ConditionValue": condition,
				"_score": toState.X
			}

			FSMData.FiniteStateMachine.Condition.push(con)

		}, this);

		//Sort
		FSMData.FiniteStateMachine.Condition.sort((a, b) => {
			return a._score > b._score
		})

	} catch (error) {
		throw error
	}
}

function parseXml(xml, callback) {
	parseString(xml, function(err, result) {
		var FSMData = {
			FiniteStateMachine: {
				State: [],
				Condition: []
			}
		}
		parseState(result, FSMData)
		parseCondition(result, FSMData)

		callback && callback(FSMData)
	});
}

module.exports = {
	parseXml: parseXml
}
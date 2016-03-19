var assert = require('assert');

var FSM = require("..").JFSM;


var testData = { "FiniteStateMachine": { "State": [{ "StateDefault": "True", "StateTrigger": "False", "StateFunction": "False", "StateName": "Idle", "X": "-4.264582591051749", "Y": "656.1466610550832", "Fields": [{ "FieldName": "ID", "Value": "1", "Macro": [] }] }, { "StateDefault": "False", "StateTrigger": "False", "StateFunction": "False", "StateName": "Die", "X": "957.7072957727798", "Y": "216.1466610550832", "Fields": [{ "FieldName": "ID", "Value": "2", "Macro": [] }] }, { "StateDefault": "False", "StateTrigger": "False", "StateFunction": "False", "StateName": "AnyState", "X": "-2.0286434091359524", "Y": "-223.8533389449168", "Fields": [{ "FieldName": "ID", "Value": "3", "Macro": [] }] }, { "StateDefault": "False", "StateTrigger": "False", "StateFunction": "False", "StateName": "NormalAttack", "X": "-4.264582591051749", "Y": "1096.1466610550833", "Fields": [{ "FieldName": "ID", "Value": "4", "Macro": [] }] }], "Condition": [{ "StateIDFrom": "3", "StateIDTo": "2", "ConditionValue": "IsOnDie()", "ByteCode": "1,IsOnDie,0,2,13,0:15,,0,0" }, { "StateIDFrom": "1", "StateIDTo": "4", "ConditionValue": "!IsTargetOutOfRange()", "ByteCode": "1,IsTargetOutOfRange,0,2,13,0:12,,1,4,13,0,14,0:15,,1,0" }, { "StateIDFrom": "4", "StateIDTo": "1", "ConditionValue": "IsTargetOutOfRange()", "ByteCode": "1,IsTargetOutOfRange,0,2,13,0:15,,0,0" }] } }

describe('Load FSM', function() {
    var obj;

    before(function() {
        obj = new FSM(testData.FiniteStateMachine);
    });

    it('Should Correcly State Length 4', function() {
        assert.equal(4, obj.State.length)

    });
    
    it('Should Correcly Current State 1', function() {
        assert.equal(1, obj.CurrentState.ID)
    });
    
    it('JSON Stringify FSM', function() {
        console.log(obj)
    });
});
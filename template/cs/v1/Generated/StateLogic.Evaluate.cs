using System;
using FsmCodeBase;

// Auto Generated. Don't modify it

namespace Fsm.Generated.{{=it.FsmName}}
{
    partial class {{=it.StateName}}
    {
        public override string _Evaluate(StateMachine context)
        {
            var stateData = ({{=it.StateDataName}})context.StateData;
         
            {{ for(var prop in it.Transitions) { }}
            if({{=it.Transitions[prop].ConditionValue}})
                return "{{=it.Transitions[prop].NextState}}";
            {{ } }}

            return null;
        }
    }
}

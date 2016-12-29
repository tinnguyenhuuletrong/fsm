using System;
using FsmCodeBase;

// Auto Generated. Don't modify it

namespace Fsm.Generated.FsmColor
{
    partial class Green
    {
        public override string _Evaluate(StateMachine context)
        {
            var stateData = (FsmColorStateData)context.StateData;
         
            
            if(stateData.timeSinceEnter > 2000)
                return "Blue";
            

            return null;
        }
    }
}

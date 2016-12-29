using System;
using FsmCodeBase;

namespace FsmCodeBase.Test
{
    partial class Blue
    {
        public override string _Evaluate(StateMachine context)
        {
            var stateData = (FsmColorStateData)context.StateData;
            if (stateData.loop && stateData.timeSinceEnter > 2000)
                return "Red";

            return null;
        }
    }
}

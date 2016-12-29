using System;
using FsmCodeBase;

namespace FsmCodeBase.Test
{
    partial class Green
    {
        public override string _Evaluate(StateMachine context)
        {
            var stateData = (FsmColorStateData)context.StateData;
            if (stateData.timeSinceEnter > 2000)
                return "Blue";

            return null;
        }
    }
}

using System;
using FsmCodeBase;

namespace FsmCodeBase.Test
{
    partial class Red : BaseState
    {
        public override string GetName()
        {
            return "Red";
        }

        public override void OnEnter(StateMachine context)
        {
            Console.WriteLine("[OnEnter] Red");
            base.OnEnter(context);
        }

        public override string OnUpdate(float dt, StateMachine context)
        {
            return base.OnUpdate(dt, context);
        }

        public override void OnEvent(string name, object args, StateMachine context)
        {
            base.OnEvent(name, args, context);
        }

        public override void OnExit(StateMachine context)
        {
            Console.WriteLine("[OnExit] Red");
            base.OnExit(context);
        }
    }
}

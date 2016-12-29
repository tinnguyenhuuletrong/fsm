using System;
using FsmCodeBase;

namespace FsmCodeBase.Test
{
    partial class Green : BaseState
    {
        public override string GetName()
        {
            return "Green";
        }

        public override void OnEnter(StateMachine context)
        {
            Console.WriteLine("[OnEnter] Green");
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
            Console.WriteLine("[OnExit] Green");
            base.OnExit(context);
        }
    }
}

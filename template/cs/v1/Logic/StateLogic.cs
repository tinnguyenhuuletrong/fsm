using System;
using FsmCodeBase;

// ----------
// State Logic Implement Below
// ----------

namespace Fsm.Generated.{{=it.FsmName}}
{
    partial class {{=it.StateName}} : BaseState
    {
        public override string GetName()
        {
            return "{{=it.StateName}}";
        }

        public override void OnEnter(StateMachine context)
        {
            // Logic Code Here
            base.OnEnter(context);
        }

        public override string OnUpdate(float dt, StateMachine context)
        {
            // Logic Code Here
            return base.OnUpdate(dt, context);
        }

        public override void OnEvent(string name, object args, StateMachine context)
        {
            // Logic Code Here
            base.OnEvent(name, args, context);
        }

        public override void OnExit(StateMachine context)
        {
            // Logic Code Here
            base.OnExit(context);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FsmCodeBase
{
    partial class BaseState
    {
        public virtual string GetName() { return string.Empty; }

        public virtual string _Evaluate(StateMachine context) { return null; }

        public virtual void OnEnter(StateMachine context) { }
        public virtual void OnExit(StateMachine context) { }
        public virtual string OnUpdate(float dt, StateMachine context) { return _Evaluate(context); }
        public virtual void OnEvent(string name, object args, StateMachine context) { }
    }
}

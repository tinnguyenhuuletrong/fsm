using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FsmCodeBase.Plugin
{
    interface IPlugin
    {
        void OnCheckPoints(FsmCodeBase.EFsmCheckPoints checkpoint, StateMachine fsm, Dictionary<string, object> extraValues);
    }
}

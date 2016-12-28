using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// ExtendFields BaseState
namespace FsmCodeBase
{
    partial class BaseStateData
    {
        public float timeSinceEnter = 0;
    }
}

namespace FsmCodeBase.Plugin
{
    class TimePlugin : IPlugin
    {
        public void OnCheckPoints(EFsmCheckPoints checkpoint, StateMachine fsm, Dictionary<string, object> extraValues)
        {
            switch(checkpoint)
            {
                case EFsmCheckPoints.OnExit:
                case EFsmCheckPoints.OnEnter:
                    {
                        fsm.StateData.timeSinceEnter = 0;
                        return;    
                    }

                case EFsmCheckPoints.OnUpdate:
                    {
                        float dt = (float)extraValues["dt"];
                        fsm.StateData.timeSinceEnter += dt;
                        return;
                    }
            }
        }
    }
}

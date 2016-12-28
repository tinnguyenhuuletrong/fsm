using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FsmCodeBase
{
    enum EFsmCheckPoints {
        OnExit,
        OnEnter,
        OnUpdate,
        OnEvent
    }

    class StateMachine
    {
        private BaseStateData mStateData;
        private Dictionary<string, BaseState> mStateDB;
        private List<FsmCodeBase.Plugin.IPlugin> mPlugins;
        private Stack<BaseState> mStackState;
        private BaseState mCurrentState;
        private Dictionary<string, object> mEventExtraValues = new Dictionary<string, object>();

        public Dictionary<string, object> Context { get; set; }
        public BaseStateData StateData { get { return mStateData; } }
        public BaseState CurrentState { get { return mCurrentState; } }

        public StateMachine(BaseStateData stateData, FsmCodeBase.Plugin.IPlugin[] plugins) 
        {
            mStateData = stateData;
            mPlugins = new List<Plugin.IPlugin>();
            mPlugins.AddRange(plugins);
            mStackState = new Stack<BaseState>();
            mStateDB = new Dictionary<string, BaseState>();
            Context = new Dictionary<string, object>();
        }

        public void Load(Dictionary<string, BaseState> states, string defaultStateName)
        {
            foreach (var item in states)
            {
                mStateDB.Add(item.Key, item.Value);
            }

            _ReplaceState(defaultStateName);
        }

        public void AddPlugin(FsmCodeBase.Plugin.IPlugin plugin)
        {
            mPlugins.Add(plugin);
        }

        public void Update(float dt)
        {
            if (mCurrentState == null)
                return;

            string nextState = mCurrentState.OnUpdate(dt, this);

            // Plugin Event OnUpdate
            mEventExtraValues.Clear();
            mEventExtraValues["dt"] = dt;
            _InvokePluginEvent(EFsmCheckPoints.OnUpdate);

            if (nextState != null)
                _ReplaceState(nextState);
        }

        private void _ReplaceState(string nextStateName)
        {
            if(mCurrentState != null)
            {
                mCurrentState.OnExit(this);

                // Plugin Event onExit
                mEventExtraValues.Clear();
                mEventExtraValues["oldStateName"] = mCurrentState.GetName();
                mEventExtraValues["nextStateName"] = nextStateName;
                _InvokePluginEvent(EFsmCheckPoints.OnExit);
            }

            mCurrentState = this.mStateDB[nextStateName];

            if (mCurrentState == null)
                throw new ArgumentException("[StateMachine] State with name "+ nextStateName +" not found on DB");

            mCurrentState.OnEnter(this);

            // Plugin Event onEnter
            mEventExtraValues.Clear();
            _InvokePluginEvent(EFsmCheckPoints.OnEnter);
        }

        private void _InvokePluginEvent(EFsmCheckPoints checkpoints)
        {
            for (int i = 0; i < mPlugins.Count; i++)
            {
                mPlugins[i].OnCheckPoints(checkpoints, this, mEventExtraValues);
            }
        }
    }
}

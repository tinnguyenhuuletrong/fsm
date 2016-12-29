using System;
using FsmCodeBase;


namespace Fsm.Generated.{{=it.FsmName}}
{
    static class {{=it.FsmName}}Index
    {
        ///
        /// Get State Database
        ///
        public static Dictionary<string, BaseState> GetStateDB()
        {
            Dictionary<string, BaseState> db = new Dictionary<string, BaseState>();
            {{ for(var prop in it.states) { }}
                db["{{=prop}}"] = new {{=prop}}();
            {{ } }}

            return db;
        }

        ///
        /// Get State Data
        ///
        public static BaseStateData GetStateData()
        {
            return new {{=it.StateDataName}}();
        }
    }
}

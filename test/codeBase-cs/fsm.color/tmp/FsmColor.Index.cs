using System;
using FsmCodeBase;


namespace Fsm.Generated.FsmColor
{
    static class FsmColorIndex
    {
        ///
        /// Get State Database
        ///
        public static Dictionary<string, BaseState> GetStateDB()
        {
            Dictionary<string, BaseState> db = new Dictionary<string, BaseState>();
            
                db["Red"] = new Red();
            
                db["Green"] = new Green();
            
                db["Blue"] = new Blue();
            

            return db;
        }

        ///
        /// Get State Data
        ///
        public static BaseStateData GetStateData()
        {
            return new FsmColorStateData();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FsmCodeBase.Test
{
    static class FsmColorIndex
    {
        public static Dictionary<string, BaseState> GetStateDB()
        {
            Dictionary<string, BaseState> db = new Dictionary<string, BaseState>();
            db["Red"] = new FsmCodeBase.Test.Red();
            db["Green"] = new FsmCodeBase.Test.Green();
            db["Blue"] = new FsmCodeBase.Test.Blue();

            return db;
        }

        public static BaseStateData GetStateData()
        {
            return new FsmColorStateData();
        }
    }
}

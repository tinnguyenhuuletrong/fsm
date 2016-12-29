using FsmCodeBase.Test;

namespace FsmCodeBase
{
    class Program
    {
        static void Main(string[] args)
        {
            Plugin.IPlugin[] plugins = { new Plugin.TimePlugin() };

            StateMachine sm = new StateMachine(FsmCodeBase.Test.FsmColorIndex.GetStateData(), plugins);
            sm.Load(FsmCodeBase.Test.FsmColorIndex.GetStateDB(), "Red");

            FsmCodeBase.Test.FsmColorStateData colorStateData = sm.StateData as FsmCodeBase.Test.FsmColorStateData;
            colorStateData.loop = true;

            for (int i = 0; i < 40; )
            {
                sm.Update(100);

                System.Threading.Thread.Sleep(10);
            }
        }
    }
}

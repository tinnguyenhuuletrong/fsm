
namespace FsmCodeBase
{
    class Program
    {
        static void Main(string[] args)
        {
            Plugin.IPlugin[] plugins = { new Plugin.TimePlugin() };

            StateMachine sm = new StateMachine(Fsm.Generated.FsmColor.FsmColorIndex.GetStateData(), plugins);
            sm.Load(Fsm.Generated.FsmColor.FsmColorIndex.GetStateDB(), "Red");

            Fsm.Generated.FsmColor.FsmColorStateData colorStateData = sm.StateData as Fsm.Generated.FsmColor.FsmColorStateData;
            colorStateData.loop = true;

            for (int i = 0; i < 40; )
            {
                sm.Update(100);

                System.Threading.Thread.Sleep(10);
            }
        }
    }
}

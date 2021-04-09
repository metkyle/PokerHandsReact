using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PokerHandsReact.Controllers;

namespace PokerHandsReactTest
{
    [TestClass]
    public class PokerHands
    {
        [TestMethod]
        public void IndexTest()
        {
            HomeController controller = new HomeController();
            ViewResult result = controller.Index() as ViewResult;
            Assert.IsNotNull(result);
        }
    }
}

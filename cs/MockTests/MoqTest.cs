using System;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Shokunin.MockTests
{
    public interface IFakeTest
    {
        int A();

        string B();

        decimal C();
    }

    [TestClass]
    public class MoqTest
    {
        [TestMethod]
        public void TestAMoqMock()
        {
            var fake = new Mock<IFakeTest>();
            fake.Setup(mock => mock.A()).Returns(1);

            var sut = fake.Object;
            
            Assert.AreEqual(1, sut.A());

            Console.WriteLine("B is :" + sut.B());

            sut.C();

            // Explicitly verify each expectation...
            fake.Verify(mock => mock.A(), Times.Once());
            
            // Verify everything
            fake.VerifyAll();
        }


        [TestMethod]
        public void TestAMoqStub()
        {
            var fake = new Mock<IFakeTest>();
            fake.Setup(mock => mock.A()).Returns(1);

            var sut = fake.Object;

            Assert.AreEqual(1, sut.A());

            Console.WriteLine("B is :" + sut.B());

            sut.C();

            // Explicitly verify each expectation...
            fake.Verify(mock => mock.A(), Times.Once());

            // For stub behaviour, we just don't verify anything
            // fake.VerifyAll();
        }


    }
}

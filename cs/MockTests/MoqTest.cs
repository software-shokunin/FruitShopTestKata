using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Shokunin.MockTests
{
    public interface IFakeStubjectUnderTest
    {
        int GetInteger();

        string GetString();

        decimal GetDecimal();

        DateTime GetDateTime();
    }

    [TestClass]
    public class MoqTest
    {
        [TestMethod]
        public void TestAMoqStub()
        {
            // wrap fake with interceptors
            var fake = new Moq.Mock<IFakeStubjectUnderTest>();

            // set up mappings
            fake.Setup(mock => mock.GetInteger()).Returns(1);

            var sut = fake.Object;

            Assert.AreEqual(1, sut.GetInteger());

            Console.WriteLine("B is :" + sut.GetString());

            sut.GetDecimal();

            // Explicitly verify each expectation...
            fake.Verify(mock => mock.GetInteger(), Times.Once());

            // For stub behaviour, we just don't verify anything
            fake.VerifyAll();
        }

        [TestMethod]
        public void TestAMoqMock()
        {
            var fake = new Moq.Mock<IFakeStubjectUnderTest>();
            fake.Setup(mock => mock.GetInteger()).Returns(1);

            // Moq keeps the fake and its definition separate
            var sut = fake.Object;

            Assert.AreEqual(1, sut.GetInteger());
            Assert.AreEqual(1, sut.GetInteger());

            // when no mappings are set, a mock will return default<T>
            Assert.AreEqual(null, sut.GetString());
            Assert.AreEqual(0m, sut.GetDecimal());
            Assert.AreEqual(DateTime.MinValue, sut.GetDateTime());

            // Explicitly verify each expectation...
            fake.Verify(mock => mock.GetInteger(), Times.Exactly(2));

            // Verify everything
            fake.VerifyAll();
        }
    }
}

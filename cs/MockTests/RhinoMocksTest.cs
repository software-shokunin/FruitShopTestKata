using System;
using Rhino.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Shokunin.MockTests
{
    [TestClass]
    public class RhinoMocksTest
    {
        [TestMethod]
        public void TestARhinoMocksStrictMock()
        {
            // a strict mock is v fussy
            var fake = MockRepository.GenerateStrictMock<IFakeTest>();

            fake.Expect(mock => mock.A())
                .Return(1)
                .Repeat
                .Once();

            var sut = fake;
            
            Assert.AreEqual(1, sut.A());

            // this will break sut.B();

            fake.VerifyAllExpectations();
        }

        [TestMethod]
        public void TestARhinoMocksStrictMock2Calls()
        {
            var fake = MockRepository.GenerateStrictMock<IFakeTest>();

            fake.Expect(mock => mock.A())
                .Return(1)
                .Repeat
                .Once();

            fake.Expect(mock => mock.B())
                .Return("hello")
                .Repeat
                .Once();

            fake.Expect(mock => mock.C())
                .Return(2.3m)
                .Repeat
                .Once();

            var sut = fake;

            Assert.AreEqual(1, sut.A());

            sut.C();
            sut.B();

            fake.VerifyAllExpectations();
        }

        [TestMethod]
        public void TestARhinoMocksStub()
        {
            var fake = MockRepository.GenerateStub<IFakeTest>();

            fake.Expect(mock => mock.A())
                .Return(1)
                .Repeat
                .Once();

            fake.Expect(mock => mock.B())
                .Return("hello")
                .Repeat
                .Once();

            //fake.Expect(mock => mock.C())
            //    .Return(2.3m)
            //    .Repeat
            //    .Once();

            var sut = fake;

            Assert.AreEqual(1, sut.A());

            Assert.AreEqual(0m, sut.C());

            sut.C();
            //sut.B();

            fake.VerifyAllExpectations();
        }


    }
}

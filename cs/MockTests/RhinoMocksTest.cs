using Rhino.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Shokunin.MockTests
{
    [TestClass]
    public class RhinoMocksTest
    {
        [TestMethod]
        public void TestARhinoMocksStub()
        {
            var fake = Rhino.Mocks.MockRepository
                .GenerateStub<IFakeStubjectUnderTest>();

            fake.Expect(mock => mock.GetInteger())
                .Return(1)
                .Repeat
                .Once();  // only once

            //fake.Expect(mock => mock.GetString())
            //    .Return("hello")
            //    .Repeat
            //    .Once();

            //fake.Expect(mock => mock.GetDecimal())
            //    .Return(2.3m)
            //    .Repeat
            //    .Once();

            //fake.Expect(mock => mock.GetDateTime())
            //    .Return(new DateTime(2016,1,1))
            //    .Repeat
            //    .Once();

            Assert.AreEqual(1, fake.GetInteger());


            // this would break a stric mock, but a stub doesn't care
            // it returns default<T>
            // because GetInteger only has a value defined once
            Assert.AreEqual(0, fake.GetInteger());

            // Similarly, anything else undefined returns default<T>
            Assert.AreEqual(null, fake.GetString());
            Assert.AreEqual(0m, fake.GetDecimal());
            Assert.AreEqual(DateTime.MinValue, fake.GetDateTime());
            
            fake.VerifyAllExpectations();
        }

        [TestMethod]
        public void TestARhinoMocksStrictMock()
        {
            // a strict mock is v fussy
            var fake = Rhino.Mocks.MockRepository
                .GenerateStrictMock<IFakeStubjectUnderTest>();

            fake.Expect(mock => mock.GetInteger())
                .Return(1)
                .Repeat
                .Once(); // it's only going to return it once...
            
            var sut = fake;
            
            Assert.AreEqual(1, sut.GetInteger());

            // unlike any other kind of mock, a strict mock will break here
            // 99% of frameworks return default
            //Assert.AreEqual(0m, sut.GetDecimal());
            
            fake.VerifyAllExpectations();
        }

        [TestMethod]
        public void TestARhinoMocksStrictMock2Calls()
        {
            var fake = Rhino.Mocks.MockRepository
                .GenerateStrictMock<IFakeStubjectUnderTest>();

            fake.Expect(mock => mock.GetInteger())
                .Return(1)
                .Repeat
                .Once();

            fake.Expect(mock => mock.GetString())
                .Return("hello")
                .Repeat
                .Once();

            fake.Expect(mock => mock.GetDecimal())
                .Return(2.3m)
                .Repeat
                .Once();

            var sut = fake;

            Assert.AreEqual(1, sut.GetInteger());

            sut.GetDecimal();
            sut.GetString();

            fake.VerifyAllExpectations();
        }
    }
}

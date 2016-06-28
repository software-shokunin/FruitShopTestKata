let chai = require('chai');
let expect = chai.expect;
chai.use(require("sinon-chai"));

let sinon = require('sinon');

describe('02 MockedExamples:', () => {

    let TestExamples = require('./04 testExamples');
    let FruitShop = require('../src/fruitshopApi');
    let Engine = require('../src/engine');
    let fruitShop = null; // this is the system under test
    let examples = null;
    let engine = null; 
   
    beforeEach(done => {
        
        // create system under test
        engine = new Engine();
        fruitShop = new FruitShop(engine);
        examples = new TestExamples();
        
        done();
    });

    afterEach(done => {
        done();
    });

    context('Fixture setup:', () => {
        it('should not be null', () => {
            expect(fruitShop).to.not.be.undefined;
        });
    });
    
    context('Mock, Stub and Spy Example:', () => {
        
        it('Sinon will act as a simple stub', () => {
            let stub = sinon.stub(engine, 'AddOrReplace');
            stub.returns("Not OK!");
            expect(engine.AddOrReplace(), 'Not OK!');
        });
        
        it('Spies on real stuff... ', () => {
            
            // spy on existing implementation
            let spy = sinon.spy(engine, 'AddOrReplace');
            
            // exercise functionality - as per a stateful test 
            expect(engine.AddOrReplace(examples.bananas), 'OK');
            
            // now you can make assertions on the spy 
            expect(engine.AddOrReplace.calledOnce);
            
            // this asserts that our input is passed along to engine
            expect(engine.AddOrReplace.getCall(0).args[0])
                .to.deep.equal(examples.bananas);
        });
        
        it('A Sinon mock is strict about methods it knows about ', () => {
            
            let mock = sinon.mock(engine, 'AddOrReplace');
            mock.expects('AddOrReplace').once().returns('Not OK!');
            
            expect(engine.AddOrReplace(), 'Not OK!');
            
            // Example - an unexpected call will break a strict mock
            // engine.AddOrReplace("banana"); // additional call 
           
            // but an additional call to an un-mocked method doesn't fail
            // some Strict mocks will complain about this
            // console.log("NB. result of unmocked call: " + engine.IsSupplierPermittedToAdd('a', 'b'));
            
            mock.verify();
        });          
    });
});
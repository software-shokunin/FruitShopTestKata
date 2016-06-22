let chai = require('chai');
let expect = chai.expect;
chai.use(require("sinon-chai"));

let sinon = require('sinon');

describe('MockedExamples:', () => {

    let TestExamples = require('./testExamples');
    let FruitShop = require('../lib/fruitshop');
    let ItemsRepository = require('../lib/itemsRepository');
    let fruitShop = null; // this is the system under test
    let examples = null;
    let itemsRepository = null; 
   
    beforeEach(done => {
        
        // create system under test
        itemsRepository = new ItemsRepository();
        fruitShop = new FruitShop(itemsRepository);
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
            let stub = sinon.stub(itemsRepository, 'AddOrReplace');
            stub.returns("Not OK!");
            expect(itemsRepository.AddOrReplace(), 'Not OK!');
        });
        
        it('Spies on real stuff... ', () => {
            
            // spy on existing implementation
            let spy = sinon.spy(itemsRepository, 'AddOrReplace');
            
            // exercise functionality - as per a stateful test 
            expect(itemsRepository.AddOrReplace(examples.bananas), 'OK');
            
            // now you can make assertions on the spy 
            expect(itemsRepository.AddOrReplace.calledOnce);
            
            // this asserts that our input is passed along to itemsRepository
            expect(itemsRepository.AddOrReplace.getCall(0).args[0])
                .to.deep.equal(examples.bananas);
        });
        
        it('A Sinon mock is strict about methods it knows about ', () => {
            
            let mock = sinon.mock(itemsRepository, 'AddOrReplace');
            mock.expects('AddOrReplace').once().returns('Not OK!');
            
            expect(itemsRepository.AddOrReplace(), 'Not OK!');
            
            // Example - an unexpected call will break a strict mock
            // itemsRepository.AddOrReplace("banana"); // additional call 
           
            // but an additional call to an un-mocked method doesn't fail
            // some Strict mocks will complain about this
            // console.log("NB. result of unmocked call: " + itemsRepository.IsSupplierPermittedToAdd('a', 'b'));
            
            mock.verify();
        });          
    });
});
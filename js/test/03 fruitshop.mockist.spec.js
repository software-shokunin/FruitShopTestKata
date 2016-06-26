let chai = require('chai');
let expect = chai.expect;
chai.use(require("sinon-chai"));

let sinon = require('sinon');

describe('MockedFruitShop:', () => {

    let TestExamples = require('./04 testExamples');
    let FruitShop = require('../lib/fruitshopApi');
    let Engine = require('../lib/engine');
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
    
    context('Mock AddSupplyItem:', () => { 
        
        it('Should return "OK"', () => {
            // was
            // expect(fruitShop.AddSupplyItem(examples.bananas)).to.equal("OK");
            // becomes
            
            // Where did the 'AddOrReplace' concept come from?
            let mock = sinon.mock(engine, 'AddOrReplace');
            
            // Yes, we're testing zero logic in fruitShop, but also a key
            // point is that internal details about a dependency have leaked out here
            // It's a bit like always saying "these ARE the droids we're looking for"
            
            // We also need to know about its internal communications...
            mock.expects('AddOrReplace').withArgs(examples.bananas)
                .returns('OK');
            
            // do we get the right result? (... should we care, in a mockist test?)
            expect(fruitShop.AddSupplyItem(examples.bananas))
                .to.equal('OK');
            
            // making an additional call will break the test
            // fruitShop.AddSupplyItem(examples.bananasChangedItem)
            
            // also, we're making an assertion that the function was implemented as per the mock's expectations
            mock.verify();
            
        });
        
        it('Should permit us to replace SupplyItems:', () => {
            
            // We could stipulate that AddOrReplace is called twice?
            // was
            // fruitShop.AddSupplyItem(examples.bananas);
            // expect(fruitShop.AddSupplyItem(examples.bananasChangedItem))
            //     .to.equal("OK");    
            // now
            let mock = sinon.mock(engine, 'AddOrReplace');
            
            mock.expects('AddOrReplace').withArgs(examples.bananas)
                .once()
                .returns('OK');
            
            // err, we're just manging the controller code
            mock.expects('AddOrReplace').withArgs(examples.bananasChangedItem)
                .once()
                .returns('OK'); // change this to OK2 to make the test fail
            
            // some people will use a 'Strict Mock' to enforce the order of calls
            
            // do we get the right result? (... should we care, in a mockist test?)
            expect(fruitShop.AddSupplyItem(examples.bananas))
                .to.equal('OK'); 
                    
            expect(fruitShop.AddSupplyItem(examples.bananasChangedItem))
                .to.equal('OK');
            
            mock.verify(); // don't often pass first time
        });
        
        it('MOCK: AddSupplyItem returns Not OK', () => {
            
            let mock = sinon.mock(engine, 'AddOrReplace');
            
            // We're currently testing nothing!
            mock.expects('AddOrReplace').withArgs(examples.bananas)
                .returns('Not OK!');
            
            //would make it fail
            //fruitShop.AddSupplyItem(examples.bananasChangedItem)
            
            // do we get the right result?
            expect(fruitShop.AddSupplyItem(examples.bananas))
                .to.equal('Not OK!');
            
            mock.verify();
        });
        
        // Later... we'll added a breaking security test - can you fix it?
        xcontext('Unathorized supplier:', () => {       
            it('AddSupplyItem returns "Not OK"', () => {
                
                let mock = sinon.mock(engine, 'AddOrReplace');
                
                // if a put is unathorized, we shouldn't expect a call to 'Add'
                mock.expects('AddOrReplace')
                    .withArgs(examples.bananasUnathorized)
                    .never();
                    
                expect(fruitShop.AddSupplyItem(examples.bananasUnathorized))
                    .to.equal("Not OK!");
                
                mock.verify();
            });
        });

        xcontext('Authorized supplier:', () => {           
            it('AddSupplyItem returns OK', () => {
                
                let mock = sinon.mock(engine, 'AddOrReplace');
                mock.expects('AddOrReplace').withArgs(examples.bananas)
                    .returns('OK');
                    
                expect(fruitShop.AddSupplyItem(examples.bananas)).to.equal("OK");
                
                mock.verify();
            });
        });
    });
    
    context('GetSupplyItems:', () => {
        
        it('Should return a SupplyItem added by AddSupplyItem', () => {
            // was    
            // fruitShop.AddSupplyItem(examples.bananas);
            // expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
            //    .to.deep.equal( [examples.bananas] );
            // now
            
            // a crazy test - but consider these are often added early 
            // during incremental TDD, mocking out Engine, before it existed
            
            // GOTCHA - the test is harder to understand 
            // GOTCHA - because we're forced to emulate the behaviour of engine here,
            // GOTCHA - if the behaviour of the real component changes, these tests *may* not break!
            let mock = sinon.mock(engine, 'AddOrReplace');
            mock.expects('AddOrReplace').withArgs(examples.bananas)
                .returns('OK');
            
            mock.expects('GetByCommodity').withArgs(examples.bananas.commodityName)
                .returns([examples.bananas]); 
                
            var expected = [examples.bananas];
                
            fruitShop.AddSupplyItem(examples.bananas);
                    
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
                .to.deep.equal(expected);
                
            mock.verify();
        });
            
        
        it('GetSupplyItems returns empty array for unknown commodity', () => {
            
            //fruitShop.AddSupplyItem(examples.bananas);
            //expect(fruitShop.GetSupplyItems("non-existent commodityName"))
            //    .to.be.emptyArray;
            
            // test that GetSupplyItems passes and returns the correct argument to the repo
            // using a specific method and protocol
        });
        
        it('Should return only the most up to date SupplyItem:', () => {
       
            //fruitShop.AddSupplyItem(examples.bananas);
            //fruitShop.AddSupplyItem(examples.bananasChangedItem);
            
            //expect(fruitShop.GetSupplyItems(examples.bananasChangedItem.commodityName))
            //    .to.deep.equal( [examples.bananasChangedItem] );
            
            // we can't test stateful workflows using mocks in front of repositories, only connections
            // we can use a fake though, (e.g. an array instead of a database)
        });
    });
    
    it('Could add further tests as we add non-trivial controller logic');
    
    context('Invalid AddSupplyItem :', () => {    
        it('throws NULLFAIL:AddSupplyItem when null', () => {
            expect(() => fruitShop.AddSupplyItem(null)).to.throw(Error, 'NULLFAIL:AddSupplyItem');
        });
    });
});
let expect = require('chai').expect;

describe('FruitShop:', () => {

    let TestExamples = require('./testExamples');
    let FruitShop = require('../src/fruitshop');
    let ItemsRepository = require('../src/itemsRepository');
    let fruitShop = null; // this is the system under test
    let examples = null;
    
    beforeEach(done => {
        // create system under test - each 'it' call gets a clean fixture
        fruitShop = new FruitShop(new ItemsRepository());
        examples = new TestExamples();
        done();
    });

    context('Fixture:', () => {
        it('Setup should not be null', () => {
            expect(fruitShop).to.not.be.undefined;
        });
    });
    
    context('AddSupplyItem:', () => { 
        
        it('Should return "OK"', () => {
            expect(fruitShop.AddSupplyItem(examples.bananas)).to.equal("OK");
        });
        
        it('Should permit us to replace SupplyItems:', () => {
            fruitShop.AddSupplyItem(examples.bananas);
            expect(fruitShop.AddSupplyItem(examples.bananasChangedItem)).to.equal("OK");            
        });
        
    });
       
    context('GetSupplyItems:', () => {
        
        it('Should return a SupplyItem added by AddSupplyItem', () => {
                
            fruitShop.AddSupplyItem(examples.bananas);
                    
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
                .to.deep.equal( [examples.bananas] );
        });
        
        it('GetSupplyItems returns empty array for unknown commodity', () => {
            
            fruitShop.AddSupplyItem(examples.bananas);
                    
            expect(fruitShop.GetSupplyItems("non-existent commodityName"))
                .to.be.emptyArray;
        });
        
        it('Should return only the most up to date SupplyItem:', () => {
       
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.AddSupplyItem(examples.bananasChangedItem);
            
            expect(fruitShop.GetSupplyItems(examples.bananasChangedItem.commodityName))
                .to.deep.equal( [examples.bananasChangedItem] );
        });
    });
    
    context('RemoveSupplyItem:', () => {
        
        it('Should remove a single Supply Item', () => {
            
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas.commodityName);
            
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
                .to.be.emptyArray;
        });
        
        it('Should remove multiple SupplyItems', () => {
            
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas);
            
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName)) 
                .to.be.emptyArray;
        });
        
        it('Should be idempotent', () => {
            
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas);
            
            // BUG - this should be examples.bananas.commodityName, but the test passes!
            // TODO - this should fail with an invalid request?
            expect(fruitShop.GetSupplyItems(examples.bananas)) 
                .to.be.emptyArray;
        });
    });
    
    context('Complex usage scenarios:', () => {
        
        it('Can handle addition and removal of multiple supply items', () => {
            
            expect(examples.bananas.commodityName).to.not.equal(examples.xyzOranges.commodityName);
            
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.AddSupplyItem(examples.xyzOranges);
            fruitShop.RemoveSupplyItem(examples.bananas.commodityName);
            
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
                .to.be.emptyArray;
            
            // a bug in the test?
            expect(fruitShop.GetSupplyItems(examples.xyzOranges.commodityName))
                .to.deep.equal([examples.xyzOranges]);
        });
        
        it('GetSupplyItems returns a commodity that has been removed and then re-added', () => {
            
            // remove
            fruitShop.AddSupplyItem(examples.bananas);
            fruitShop.RemoveSupplyItem(examples.bananas.commodityName);
            
            // re-add
            fruitShop.AddSupplyItem(examples.bananas);
            
            expect(fruitShop.GetSupplyItems(examples.bananas.commodityName))
                .to.deep.equal([examples.bananas]);            
        });
        
        it('We will continue to add system tests to drive the component through its lifecycle!')
        
    });
});
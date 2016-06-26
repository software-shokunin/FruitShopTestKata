let expect = require('chai').expect;

// ignored for now
xdescribe('ProductionSpec:', () => {

    let ReplayProductionTraffic = require('./05 productionFailExamples');
    let FruitShop = require('../src/fruitshopApi');
    let Engine = require('../src/engine');
    let fruitShop = null; // this is the system under test
    let replay = null;
    
    beforeEach(done => {
        // create system under test - each 'it' call gets a clean fixture
        fruitShop = new FruitShop(new Engine());

        // the test fixture helper takes the running system as a dependency!
        replay = new ReplayProductionTraffic(fruitShop);
        done();
    });

    context('Fixture:', () => {
        it('Setup should not be null', () => {
            expect(fruitShop).to.not.be.undefined;
        });
    });
    
    context('Production Outages:', () => { 
        
        it('Should return mysteriousDisappearingOrder', () => {
            var expected = replay.mysteriousDisappearingOrder();

            // TODO - go BDD with Arrange Act Assert?
            expect(fruitShop.GetSupplyItems('bananas'))
                .to.deep.equal([expected]);        
        });
        
        it('Should remove orders and avert production disaster:', () => {
            var expected = replay.productionDisaster();
        
            expect(fruitShop.GetSupplyItems('bananas'))
                .to.deep.equal([expected]);   
        });
    });
});
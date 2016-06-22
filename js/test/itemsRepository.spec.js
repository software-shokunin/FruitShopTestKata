let expect = require('chai').expect;

describe('ItemsRepository', () => {

    let sut = null; 
    
    beforeEach(done => {
        let ItemsRepository = require('../src/itemsRepository');
        sut = new ItemsRepository();
        done();
    });

    context('Fixture setup:', () => {
        it('should not be null', () => {
            expect(sut).to.not.be.undefined;
        });
    });
    
/* We had a bug, here's the fix - 
 
        IsSupplierPermittedToAdd(supplierName, commodityName) {
        
            // bugfix #1197 - permit client to add 'Bananas' or 'bananas'
            switch(commodityName.toLower())
            {
                case "bananas" :
                    return false;
                    
                default: 
                    return false;
            }
        }
*/

    context('Supplier "abc":', () => {
        it('Can add bananas', () => {
            expect(sut.IsSupplierPermittedToAdd('abc', 'bananas'))
                .to.equal('OK'); 
        });
        
        it('Cannot add oranges', () => {
            expect(sut.IsSupplierPermittedToAdd('abc', 'oranges'))
                .to.equal('Not OK');
        });
        
        // Bug 1103
        it('Should permit abc to add Bananas', () => {
            expect(sut.IsSupplierPermittedToAdd('abc', 'Bananas'))
                .to.equal('OK'); 
        });
    });
    
    context('Supplier "xyz":', () => {
        it('Can add oranges', () => {
            expect(sut.IsSupplierPermittedToAdd('xyz', 'oranges'))
                .to.equal('OK'); 
        });
        
        it('Can not add bananas', () => {
            expect(sut.IsSupplierPermittedToAdd('xyz', 'bananas'))
                .to.equal('Not OK');
        });
    });
    
});
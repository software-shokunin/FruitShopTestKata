class TestExamples {
    
    // initially examples are in memory, but could be loaded from
    // production data, to build a canonical set of (good and bad) examples

    get bananas() {
        return { 
            supplierName: 'abc',
            commodityName : 'bananas',
            price : 3.50,
            maxQuantity : 500,
        }
    };
        
    get bananasChangedItem() { 
        return {
            supplierName: 'abc',
            commodityName : 'bananas',
            price : 4.00, // price change!
            maxQuantity : 100, // less available!
        }
    };
    
    get notBananas() { 
        return {
            supplierName: 'abc',
            commodityName : 'notbananas',
            price : 4.00, // price change!
            maxQuantity : 100, // less available!
        }
    };
    
    
    
    get xyzBananas() {
        return {
            supplierName: 'xyz',
            commodityName : 'bananas',
            price : 3.50, 
            maxQuantity : 500,
        }
    };
    
    get xyzOranges() {
        return {
            supplierName: 'xyz',
            commodityName : 'oranges',
            price : 3.50, 
            maxQuantity : 500,
        }
    };
    
    get bananasUnathorized() {
        return {
            supplierName : 'notabananasupplier',
            commodityName : 'bananas',
            price : 3.50, 
            maxQuantity : 500,
        }
    };    
}

module.exports = TestExamples;
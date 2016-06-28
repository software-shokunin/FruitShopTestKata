class ReplayProductionTraffic {
    
    constructor(fruitshopApi) {
        this.fruitshopApi = fruitshopApi;
    }
    
    // these scenarios seem to be problematic
    // we can replay them using production traffic... 

    mysteriousDisappearingOrder() {

        // this order is correct
        let orderRemovedByBug = {
            supplierName: 'abc',
            commodityName : 'bananas',
            price : 3.50,
            maxQuantity : 500,
        };

        this.fruitshopApi.AddSupplyItem(orderRemovedByBug);
        
        // XYZ made an order by error 
        this.fruitshopApi.AddSupplyItem({
            supplierName: 'xyz',
            commodityName : 'bananas',
            price : 3.75,
            maxQuantity : 100,
        });

        // Then XYZ backed it out 
        this.fruitshopApi.RemoveSupplyItem('bananas');

        // the removal should have left in abc's PUT order!
        return orderRemovedByBug;
    }

    productionDisaster() {

        let expectedSingleGoodPutOrder = {
            supplierName: 'abc',
            commodityName : 'bananas',
            price : 3.50,
            maxQuantity : 500,
        };

        this.fruitshopApi.AddSupplyItem(expectedSingleGoodPutOrder);
        
        // XYZ made an order by error - two PUTs in market
        this.fruitshopApi.AddSupplyItem({
            supplierName: 'xyz',
            commodityName : 'Bananas', // XYZ system is different!
            price : 3.75,
            maxQuantity : 100,
        });

        // Then XYZ backed it out, but it wasn't removed?? TBC
        this.fruitshopApi.RemoveSupplyItem('bananas');

        return expectedSingleGoodPutOrder;
    }
}

module.exports = ReplayProductionTraffic;

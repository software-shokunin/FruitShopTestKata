class FruitShopApi {

    constructor(engine) {
        this.engine = engine;
    }

    GetSupplyItems(commodityName) {
        return this.engine.GetByCommodity(commodityName);
    }
    
    AddSupplyItem(newItem)
    {   
        if (!newItem) {
           throw new Error('NULLFAIL:AddSupplyItem');
        }
        
        // bugfix #1197 - permit client to add 'Bananas' or 'bananas'
        let commodity = {
            supplierName : newItem.supplierName,
            commodityName : newItem.commodityName.toLowerCase(),
            price : newItem.price,
            maxQuantity : newItem.maxQuantity        
        };
        
        // let's add a new security check
        let isUserAllowedToAdd = this.engine.IsSupplierPermittedToAdd(commodity.supplierName, commodity.commodityName);
        
        if (isUserAllowedToAdd === 'OK') {
           console.log('Adding ' + commodity.commodityName + ' for ' + commodity.supplierName);
           return this.engine.AddOrReplace(commodity);
        } 
        
        //return 'Not OK!';
    }
    
    RemoveSupplyItem(commodityName) {
        // TODO: there might be a multi-supplier bug here?
        return this.engine.RemoveByCommodity(commodityName);
    }
}

module.exports = FruitShopApi;

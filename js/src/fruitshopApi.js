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
        
        return this.engine.AddOrReplace(newItem);
                
        // let's add a new security check
        //let isUserAllowedToAdd = this.engine.IsSupplierPermittedToAdd(newItem.supplierName, newItem.commodityName);
        
        //if (isUserAllowedToAdd === 'OK') {
        //    console.log('Adding ' + newItem.commodityName + ' for ' + newItem.supplierName);
        //    return this.engine.AddOrReplace(newItem);
        //} 
        
        //return 'Not OK!';
    }
    
    RemoveSupplyItem(commodityName) {
        // TODO: there might be a multi-supplier bug here?
        return this.engine.RemoveByCommodity(commodityName);
    }
}

module.exports = FruitShopApi;

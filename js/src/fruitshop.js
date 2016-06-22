class FruitShop {

    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    GetSupplyItems(commodityName) {
        return this.itemsRepository.GetByCommodity(commodityName);
    }
    
    AddSupplyItem(newItem)
    {   
        if (!newItem) {
           throw new Error('NULLFAIL:AddSupplyItem');
        }
        
        return this.itemsRepository.AddOrReplace(newItem);
                
        // let's add a new security check
        //let isUserAllowedToAdd = this.itemsRepository.IsSupplierPermittedToAdd(newItem.supplierName, newItem.commodityName);
        
        //if (isUserAllowedToAdd === 'OK') {
        //    console.log('Adding ' + newItem.commodityName + ' for ' + newItem.supplierName);
        //    return this.itemsRepository.AddOrReplace(newItem);
        //} 
        
        //return 'Not OK!';
    }
    
    RemoveSupplyItem(commodityName) {
        return this.itemsRepository.RemoveByCommodity(commodityName);
    }
}

module.exports = FruitShop;

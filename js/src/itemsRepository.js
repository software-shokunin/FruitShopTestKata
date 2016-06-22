class ItemsRepository {

    constructor() {
        // this might become a database in future
        this.items = []; 
    }

    GetByCommodity(commodityName) {
        return this.items.filter(item => commodityName === item.commodityName);
    }
    
    AddOrReplace(newItem)
    {
        var elementEqualsNewItem = (element, index, array) => {
            return element.commodityName === newItem.commodityName;
        };
        
        var existingIndex = this.items.findIndex(elementEqualsNewItem);
                
        if (existingIndex > -1) {
            //console.log("replacing item " + existingIndex);
            this.items[existingIndex] = newItem;    
        } else {
            this.items.push(newItem);
        }
        
        return "OK";
    }
    
    RemoveByCommodity(commodityName) {
        
        var elementEqualsNewItem = (element, index, array) => {
            return element.commodityName === commodityName;
        };
        
        var existingIndex = this.items.findIndex(elementEqualsNewItem);
        
        if (existingIndex > -1) {
            //console.log("removing item " + existingIndex);
            this.items.splice(existingIndex, 1);    
        } else {
            // no idea what to do... throwing an error breaks idempotency
        } 
        
        return this.items.filter(item => commodityName === item.commodityName);
    }
    
    // later
    IsSupplierPermittedToAdd(supplierName, commodityName) {
        
        let result = false;
        
        // bugfix #1197 - permit client to add 'Bananas' or 'bananas'
        let commodityCode = commodityName.toString().toLowerCase();
        
        switch(commodityCode)
        {
            case 'bananas' :
                result = (supplierName === 'abc');
                break;
        
            case 'oranges' :
                result = (supplierName === 'xyz');
                break;
        }
        
        console.log('Security Result:' + result + ' commodity: ' + commodityCode + ' supplier:' + supplierName);
            
        return result ? 'OK' : 'Not OK';
    }
    
}

module.exports = ItemsRepository;
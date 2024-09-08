
const mongoose = require('mongoose');



const Shopchmetype = new mongoose.Schema({
    fruitname: {
        type: String,
    
    },
    fruittitle: {
        type: String,
        
       
    },
    price: {
        type: Number,
        
    },
    discount: {
        type: Number,
        
    },
    discribe: {
        type: String,
        
    },
    
    fruitimage: {
        type: String,
        
    },
    quantity: { 
        type: Number,
        
    }
});



const ShopDataType = mongoose.model('fruits', Shopchmetype);

module.exports = ShopDataType;

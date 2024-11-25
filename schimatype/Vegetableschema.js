
const mongoose = require('mongoose');



const Vegetablechmetype = new mongoose.Schema({
    vegetablename: {
        type: String,
    
    },
    vegetabletitle: {
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
    
    vegetableimage: {
        type: String,
        
    },
    quantity: { 
        type: Number,
        
    }
});



const VegetableDataType = mongoose.model('Vegetable', Vegetablechmetype);

module.exports = VegetableDataType;

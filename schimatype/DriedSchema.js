
const mongoose = require('mongoose');



const Driedchmetype = new mongoose.Schema({
    dfruitname: {
        type: String,
    
    },
    dfruittitle: {
        type: String,
        
       
    },
    dprice: {
        type: Number,
        
    },
    drieddiscount: {
        type: Number,
        
    },
    drieddiscribe: {
        type: String,
        
    },
    
    dfruitimage: {
        type: String,
        
    },
    dquantity: { 
        type: Number,
        
    }
});



const DriedDataType = mongoose.model('driedfruits', Driedchmetype);

module.exports = DriedDataType
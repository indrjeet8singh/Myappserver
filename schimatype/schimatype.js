
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const Myschmetype = new mongoose.Schema({
    fullname: {
        type: String,
    
    },
    email: {
        type: String,
        required: true,
       
    },
    phone: {
        type: String,
        
    },
    dob: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
    course: {
        type: String,
        
    },
    profile: {
        type: String,
        
    },
    pass: { 
        type: String,
        required: true
    }
});


Myschmetype.pre('save', function(next) {
    if (!this.isModified('pass')) return next(); 

    bcrypt.hash(this.pass, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.pass = hash;
        next();
    });
});


const MyDataType = mongoose.model('codepro', Myschmetype);

module.exports = MyDataType;

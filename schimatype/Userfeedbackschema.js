
const mongoose = require('mongoose');



const Userfeedbackschema = new mongoose.Schema({
    username: {
        type: String,
    
    },
    email: {
        type: String,
        
    },
    
    subject: {
        type: String,
        
    },
    message: { 
        type: String,
        
    }
});



const feedbackDatatype = mongoose.model('userfeedback', Userfeedbackschema);

module.exports = feedbackDatatype;

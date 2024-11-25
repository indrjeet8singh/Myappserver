const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keysecret="ppopopopopopopopopoppopopo";


const Myschmetype = new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    },
    state:{
        type:String
    },
    profile:{
        type:String
    },
    pass:{
        type:String
    },
    tokens:[
        {
            token:{
                type:String,
                require:true,
            }
        }
    ]
});

// Myschmetype.pre("save", async(next)=>{
//     if(this.isModified("pass")){
//         this.pass = await bcrypt.hash(this.pass,12);
//     }
//     next();
// });


Myschmetype.methods.customgeenratefunction = async function(){
    try{
        let mytoken = jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token:mytoken});
        await this.save();
            return mytoken;

    }
    catch(error){
        res.status(426).json(error);
    }

}






const mydatatype = new mongoose.model("codepro",Myschmetype);
module.exports = mydatatype

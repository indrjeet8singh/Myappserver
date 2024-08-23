"Access-Control-Allow-Origin"
const express = require('express');
const myapp = express.Router();
const bcrypt = require('bcrypt');
const mydatatype = require('../schimatype/schimatype');

myapp.get("/wecome", (req, res) => {
    res.send("this is external root");
});

myapp.post("/createdata", async (req, res) => {

    const { fullname, email, phone, dob, gender, profile, course, pass } = req.body;

    if (fullname.length >= 10) {
        const mydatas = new mydatatype({
            fullname, email, phone, dob, gender, profile, course, pass
        });
        await mydatas.save();
        // res.status(258).json({message:"insert data into database",status:258});
        res.status(200).json({ message: "data submit", status: 255 });
        console.log(mydatas);
    }
    else {
        res.status(450).json({ message: "not submit", status: 450 });
    }
});


myapp.get("/allusers",async(req,res)=>{
        const alldata = await mydatatype.find();
        res.send(alldata);
});


myapp.get("/singledata/:id",async(req,res)=>{
    const id = req.params.id;
        const singledata = await mydatatype.findById({_id:id});
        res.send(singledata);

});

myapp.delete("/deleterecord/:id",async(req,res)=>{
    const id = req.params.id;
        const recorddelete = await mydatatype.findByIdAndDelete({_id:id});
        res.send(recorddelete);
});



myapp.patch("/updaterecord/:id",async(req,res)=>{
    const id = req.params.id;
        const update = await mydatatype.findByIdAndUpdate(id,req.body,{new:true})
        res.send(update);
});



myapp.post("/mylogin", async (req, res) => {
    const { email,pass } = req.body;
    console.log(email);                                                                                                                                                 
    const loginrecord = await mydatatype.findOne({"email":email});
        if(!loginrecord)
        {
            res.status(408).json({ message: "email not found", status: 408 });
        }
        else
        {

    // console.log(loginrecord);
          
        // if(loginrecord.email===email && loginrecord.pass === pass)
        if(loginrecord.email===email && bcrypt.compare(pass, loginrecord.pass))
        {   
            res.status(200).json({ message: "successfull login", status: 422 });
        }
        else
        {
            res.status(404).json({ message: "record not found", status: 406 });
        }
    }

})





myapp.get("/", (req, res) => {
    res.send("this is  express js");
});

myapp.get("/about", (req, res) => {
    res.send("this is  about pagepppppppppppppppppp");
});



module.exports = myapp


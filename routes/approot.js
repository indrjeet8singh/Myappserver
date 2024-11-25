const express = require("express");
const myapp = express.Router();
// const bcrypt = require("bcrypt");
const session = require('express-session');
const bcrypt = require('bcryptjs');

const mydatatype = require("../schimatype/schimatype");
const shopdatatype = require("../schimatype/Shoppingschema");
const feedbackDatatype = require("../schimatype/Userfeedbackschema");
const DriedDataType=require('../schimatype/DriedSchema')
const mongoose = require("mongoose");
const cors = require("cors");
const authenticat = require('../midilware/midilware');
const jwt = require('jsonwebtoken');
const VegetableDataType = require("../schimatype/Vegetableschema");



myapp.use(cors());
myapp.use(express.json());

myapp.get("/wecome", (req, res) => {
  res.send("This is external root");
});

// myapp.post("/createdata", async (req, res) => {
//   const { fullname, email, phone, dob, gender, profile, course, pass } =
//     req.body;

//   if (fullname.length >= 4) {
//     const mydatas = new mydatatype({
//       fullname,
//       email,
//       phone,
//       dob,
//       gender,
//       profile,
//       course,
//       pass,
//     });
//     await mydatas.save();
//     res.status(200).json({ message: "Data submitted", status: 255 });
//     console.log(mydatas);
//   } else {
//     res.status(450).json({ message: "Not submitted", status: 450 });
//   }
// });
myapp.post("/createdata", async (req, res) => {

  const { fullname, email, phone, dob, gender, profile, state, pass } = req.body;

  if (fullname.length >= 10) {
             
              const hash_password=await bcrypt.hash(pass,10)
      const mydatas = new mydatatype({
          fullname, email, phone, dob, gender, profile, state, pass:hash_password
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



// ------------------- Fruits Shop -------------------

myapp.post("/fruitdata", async (req, res) => {
  const {
    fruitname,
    fruittitle,
    price,
    discount,
    fruitimage,
    discribe,
    quantity,
  } = req.body;

  if (fruitname.length >= 6) {
    const shopdatas = new shopdatatype({
      fruitname,
      fruittitle,
      price,
      discount,
      fruitimage,
      discribe,
      quantity,
    });
    await shopdatas.save();
    res.status(200).json({ message: "Data submitted", status: 250 });
    console.log(shopdatas);
  } else {
    res.status(450).json({ message: "Not submitted", status: 451 });
  }
});

myapp.get("/allfruits", async (req, res) => {
  try {
    const myfruits = await shopdatatype.find();
    res.json(myfruits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruits", error });
  }
});

myapp.get("/singlefruit/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const singlefruit = await shopdatatype.findById(id);
    if (!singlefruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }
    res.json(singlefruit);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruit", error });
  }
});

myapp.delete("/deletefruit/:id", async (req, res) => {
  const id = req.params.id;
  const deletefruit = await shopdatatype.findByIdAndDelete(id);
  res.json(deletefruit);
});

myapp.patch("/updatefruit/:id", async (req, res) => {
  const id = req.params.id;
  const fupdate = await shopdatatype.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.send(fupdate);
});

// ----------------------- Fruit Shop End -----------------------
//--------------------------vegetable-start------------------


myapp.post("/vegdata", async (req, res) => {
  const {
    vegetablename,
    vegetabletitle,
    price,
    discount,
    vegetableimage,
    discribe,
    quantity,
  } = req.body;

  if (vegetablename.length >= 3) {
    const vegdatas = new VegetableDataType({
      vegetablename,
      vegetabletitle,
      price,
      discount,
      vegetableimage,
      discribe,
      quantity,
    });
    await vegdatas.save();
    res.status(200).json({ message: "Data submitted", status: 250 });
    console.log(vegdatas);
  } else {
    res.status(450).json({ message: "Not submitted", status: 451 });
  }
});

myapp.get("/allvegetable", async (req, res) => {
  try {
    const myvege = await VegetableDataType.find();
    res.json(myvege);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruits", error });
  }
});

myapp.get("/singlevege/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const singlevege = await VegetableDataType.findById(id);
    if (!singlevege) {
      return res.status(404).json({ message: "Fruit not found" });
    }
    res.json(singlevege);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruit", error });
  }
});

myapp.delete("/deletevege/:id", async (req, res) => {
  const id = req.params.id;
  const deletevege = await VegetableDataType.findByIdAndDelete(id);
  res.json(deletevege);
});

myapp.patch("/updatevege/:id", async (req, res) => {
  const id = req.params.id;
  const vegeupdate = await VegetableDataType.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.send(vegeupdate);
});


//-------------------------vegetables-end-------------------
//-------------------------dried shop ----------------------------

myapp.post("/dfruitdata", async (req, res) => {
  const {
    dfruitname,
    dfruittitle,
    dprice,
    drieddiscount,
    dfruitimage,
    ddiscribe,
    dquantity,
  } = req.body;

  if (dfruitname.length >= 3) {
    const dshopdatas = new DriedDataType({
      dfruitname,
      dfruittitle,
      dprice,
      drieddiscount,
      dfruitimage,
      ddiscribe,
      dquantity,
    });
    await dshopdatas.save();
    res.status(200).json({ message: "Data submitted", status: 250 });
    console.log(dshopdatas);
  } else {
    res.status(450).json({ message: "Not submitted", status: 451 });
  }
});

myapp.get("/dallfruits", async (req, res) => {
  try {
    const mydfruits = await DriedDataType.find();
    res.json(mydfruits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruits", error });
  }
});

myapp.get("/singledfruit/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const singledfruit = await DriedDataType.findById(id);
    if (!singledfruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }
    res.json(singledfruit);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruit", error });
  }
});

myapp.delete("/deletedfruit/:id", async (req, res) => {
  const id = req.params.id;
  const deletedfruit = await DriedDataType.findByIdAndDelete(id);
  res.json(deletedfruit);
});

myapp.patch("/updatedfruit/:id", async (req, res) => {
  const id = req.params.id;
  const dfupdate = await DriedDataType.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.send(dfupdate);
});
// ---------------------------end dried shop----------------------
//-------------------------feedback-------------------------------

myapp.use(cors());
myapp.use(express.json());

myapp.post("/feedbackdata", async (req, res) => {
  const { username, email, subject, message } = req.body;

  if (username.length >= 3) {
    const feedbackdata = new feedbackDatatype({
      username,
      email,
      subject,
      message,
    });
    await feedbackdata.save();
    res.status(200).json({ message: "Data submitted", status: 250 });
    console.log(feedbackdata);
  } else {
    res.status(450).json({ message: "Not submitted", status: 451 });
  }
});

myapp.get("/allfeedback", async (req, res) => {
  try {
    const feedata = await feedbackDatatype.find();
    res.json(feedata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruits", error });
  }
});

myapp.get("/singlefeed/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const singlefeed = await feedbackDatatype.findById(id);
    if (!singlefeed) {
      return res.status(404).json({ message: "Fruit not found" });
    }
    res.json(singlefeed);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fruit", error });
  }
});

myapp.delete("/deletefeed/:id", async (req, res) => {
  const id = req.params.id;
  const deletefeed = await feedbackDatatype.findByIdAndDelete(id);
  res.json(deletefeed);
});

//-------------------------end feedback--------------------------
// -----------------------start-User----------------------
myapp.get("/allusers", async (req, res) => {
  try {
    const alldata = await mydatatype.find();
    res.json(alldata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

myapp.get("/singledata/:id", async (req, res) => {
  const id = req.params.id;
  const singledata = await mydatatype.findById({ _id: id });
  res.send(singledata);
});

myapp.delete("/deleterecord/:id", async (req, res) => {
  const id = req.params.id;
  const recorddelete = await mydatatype.findByIdAndDelete({ _id: id });
  res.send(recorddelete);
});

myapp.patch("/updaterecord/:id", async (req, res) => {
  const id = req.params.id;
  const update = await mydatatype.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.send(update);
});

// -------------------------Login-------------------
myapp.post("/mylogin", async(req,res)=>{
  console.log(req.body);
  const {email,pass} = req.body;
    
  if(!email || !pass){
      return res.status(422).json({error:"user and password dont match"});
     
  }
  try{
      const uservalidation = await mydatatype.findOne({email:email});
      if(uservalidation){
          const mathdata = await bcrypt.compare(pass,uservalidation.pass);
          console.log(mathdata);
          if(!mathdata){
              res.status(422).json({error:"password not match"});
          }else{
              //token generate after successful find data
                  const token = await uservalidation.customgeenratefunction();
              // cookies generate
                  res.cookie("usecookie",token,{
                      expires:new Date(Date.now()+9000000),
                      httpOnly:true
                  });
                  const result = {
                      uservalidation,
                      token
                  }
                  return res.status(423).json({status:423,result});
                  
          }
      }
  } catch(error)
  {}
  
});



// Token Validation Route
myapp.get("/validuser", authenticat, async (req, res) => {
  try {
    const firsttimevalid = await mydatatype.findOne({ _id: req.userId });
    res.status(227).json({ status: 227, firsttimevalid });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(401).json({ status: 401, error });
  }
});

// Current User Session Data (if using sessions)
myapp.get('/current-user', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No user logged in' });
  }
});

// Logout Route
myapp.post('/logout', (req, res) => {
  req.session.destroy(); // For session-based logout
  res.clearCookie("usecookie"); // For JWT-based logout
  res.json({ message: 'Logged out successfully' });
});
// -------------------
myapp.get("/", (req, res) => {
  res.send("This is Express.js");
});

myapp.get("/about", (req, res) => {
  res.send("This is the about page");
});

module.exports = myapp;


const mongoose = require('mongoose');

// const password = encodeURIComponent(process.env.PASSWORD);
// const db =`mongodb+srv://indrjeet8singh:${password}@cluster0.wybmel9.mongodb.net/`;

const db = process.env.DATABASE;

mongoose.connect(db).then(()=>{
    console.log("database connected...");
})

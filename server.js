'Access-Control-Allow-Origin'
let express = require('express');
let myapp = express();
const cors = require('cors');
require('dotenv').config();
require('./database/connection');
const myroot = require('./routes/approot');
const port = process.env.PORT || 8600



myapp.use(express.json());
myapp.use(cors());
myapp.use(myroot);






myapp.listen(port,()=>{
    console.log(`server is runing ${port}`);
})
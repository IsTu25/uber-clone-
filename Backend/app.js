const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app = express();
const connectToDb = require('./db/db');
connectToDb(process.env.MONGO_URI); 
app.use(cors());
app.get('/',(req,res) =>{
    app.send('hello world');
});

module.exports = app;




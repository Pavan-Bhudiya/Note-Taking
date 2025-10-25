require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT;

//middleware

const accessLog = fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'});
app.use(morgan('combined',{stream:accessLog}));


app.get('/',(req,res)=>{
	res.send('hello')
});

app.listen(PORT,()=>{
	console.log(`active on ${PORT}`)
});
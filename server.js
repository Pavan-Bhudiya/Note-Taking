require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT;


//middleware
 app.use(express.json());
const accessLog = fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'});
app.use(morgan('combined',{stream:accessLog}));



//the note array
let note =[];

app.get('/',(req,res)=>{
	res.send('server active');
});

app.get('/note',(req,res)=>{
	res.status(200).json(note)
});

app.post('/note',(req,res)=>{
const newNote = {id:note.length +1, ...req.body};
if(!req.body.title || !req.body.content){
	res.status(404).json({error:"title and body is neede"})
}
note.push(newNote);
res.status(201).json(newNote)
});

app.listen(PORT,()=>{
	console.log(`active on ${PORT}`)
});
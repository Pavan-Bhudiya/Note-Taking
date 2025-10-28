require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const { notStrictEqual } = require('assert');
const PORT = process.env.PORT;


//middleware
 app.use(express.json());
const accessLog = fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'});
app.use(morgan('combined',{stream:accessLog}));



//the note array
let note =[
	{"id":1,
	"title":"my story",
	"content":"i was 10 years old when i was 2"
}
];

//isServer up
app.get('/',(req,res)=>{
	res.send('server active');
});
//get every note
app.get('/note',(req,res)=>{
	res.status(200).json(note)
});
//post route create new note
app.post('/note',(req,res)=>{
const newNote = {id:note.length +1, ...req.body};
if(!req.body.title || !req.body.content){
	res.status(404).json({error:"title and body is neede"})
}
note.push(newNote);
res.status(201).json(newNote)
});

//patch route replace note

app.patch('/note/edit/:id', (req, res) => {
   const notez = note.find((t) => t.id === parseInt(req.params.id)); 
  if (!notez) return res.status(404).json({ message: 'note does not exit' });
  Object.assign(notez, req.body);
  res.status(200).json(notez);


});



app.listen(PORT,()=>{
	console.log(`active on ${PORT}`)
});

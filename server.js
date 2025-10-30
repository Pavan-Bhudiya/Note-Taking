require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({extended : true}))
app.use(express.json());
const accessLog = fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'});
app.use(morgan('combined',{stream:accessLog}));
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//the note array
let note =[
	{"id":1,
	"title":"Group4 -assignment",
	"content":"create a note taking api ",
	"date": new Date().toDateString()
	 
}
];

//isServer up
// simple health check
app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

// Mount API routes (from routes/notes.js) at /api/notes
const notesRouter = require(path.join(__dirname, 'routes', 'notes'));
app.use('/api/notes', notesRouter);

//get every note
app.get('/note',(req,res)=>{
	res.status(200).json(note)
});

//post route create new note
app.post('/note',(req,res)=>{
const newNote = {id:note.length +1, ...req.body,	"date": new Date().toDateString()};
if(!req.body.title || !req.body.content){
	res.status(404).json({error:"title and body is neede"})
}
note.push(newNote);
res.status(201).json(note)

});

//patch route replace note

app.patch('/note/:id', (req, res) => {
 const notez = note.find((t) => t.id === parseInt(req.params.id));

  if (!notez) return res.status(404).json({ message: 'note does not exit' });
  Object.assign(notez, req.body);
  res.status(200).json(notez);

});

app.delete('/note/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = note.length;
  const notez = note.filter((t) => t.id !== id); 
  if (notez.length === initialLength){
    return res.status(404).json({ error: 'Not found' });
	}
	note = notez

	res.status(204).send();
});



app.listen(PORT,()=>{
	console.log(`active on ${PORT}`)
});

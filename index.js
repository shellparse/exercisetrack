const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParse = require("body-parser")
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://shellparse:Mido1991@cluster0.ogl5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then((result)=>{console.log(result.connections[0].name)},(rejected)=>{console.log(rejected)})
const userSchema = new mongoose.Schema({username:String});
const User = mongoose.model("User",userSchema);
const exerciseSchema = new mongoose.Schema({username:String,description:String,duration:Number,date:Date,_id:mongoose.Types.ObjectId});
const Exercise = mongoose.model("Excercise",exerciseSchema);

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users",(req,res)=>{
User.create({username:req.body.username},(err,result)=>{
  res.json(result);
})
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

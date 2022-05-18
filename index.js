const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParse = require("body-parser")
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://shellparse:Mido1991@cluster0.ogl5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then((result)=>{console.log(result.connections[0].name)},(rejected)=>{console.log(rejected)})
const userSchema = new mongoose.Schema({username:String,exercise:Array});
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

async function getAllUsers(){
   return await User.find();
}
app.get("/api/users",(req,res)=>{
  getAllUsers().then((result)=>{res.json(result)})
})

app.post("/api/users/:_id/exercises",(req,res)=>{
  User.findById(req.params._id,(err,result)=>{if(err)console.error(err)
    else{
      result.exercise.push(Exercise.create({username:result.username,discription:req.body.discription,duration:req.body.duration,date:req.body.date?req.body.date:new Date(),user_id:mongoose.ObjectId(result._id)})
      .then((result)=>{
        return result;
      }).catch((err)=>console.log(err))
  )
  result.save();
    }
    }
  )});
  // link exercise document to user using user id

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

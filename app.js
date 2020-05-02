const express = require('express');
const app = express();
const mongodb = require('mongodb');
const port=5000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine', 'ejs')
const MongoClient = mongodb.MongoClient
const uri = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
app.get('/display',(req,res)=>{
    res.render('server',{name:"",tasks:""})
})
 app.post('/display',(req,res) => {
     MongoClient.connect(uri ,(err,db) => {
         
         let dbll = db.db("atom")
         dbll.collection('tasks').find({}).toArray(function(err, docs){
            console.log(JSON.stringify(docs[0].members[0].id))
           } )
        
    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)
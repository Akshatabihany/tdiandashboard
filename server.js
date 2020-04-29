const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/',(req,res)=>
 {
     res.sendFile(__dirname+'/server.html')
 })
  
app.get('/display',(req,res) => {
    
    MongoClient.connect(uri ,(err,db) => {
        if (err) throw err
        let dbll = db.db("atom")
        let query = {
            name : req.body.name
        }
        dbll.collection("users").find(query),{name:1,email:0,regno:0,dept:0,year:0,domain:0,password:0,verified:0,userType:0,_id:0}((dbErr,result) => {
            if(dbErr) throw dbErr
            res.render('server',{'name' : result})
            db.close()
        })
    })
})

app.listen(3000,()=>
    {
        console.log("hh")
    })

const express = require('express');
const app = express();
const mongodb = require('mongodb');
const port=2000;
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
         if (err) throw err
         let dbll = db.db("atom")
         let query = {
             name : req.body.name
         }
         var p;
         dbll.collection('users').findOne(query ,(dbErr,result) => {
            if(dbErr) throw dbErr
            else
           { p=JSON.stringify(result._id);
            console.log(result._id)
             console.log(p)
    }
         })
            
          const s =  dbll.collection('tasks').find({
            'members': { $elemMatch: { 'id': p } }
          });
                console.log(s.name)
        
    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)
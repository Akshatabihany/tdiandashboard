const express = require('express');
const app = express();
const mongodb = require('mongodb');
const port=3000;
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine', 'ejs')
const MongoClient = mongodb.MongoClient
const uri = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
app.get('/display',(req,res)=>{
    res.render('server',{name:""})
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
            if(dbErr) 
            {throw dbErr}
            else
            { p=JSON.stringify(result._id);
        //      console.log(result._id)
            //+ console.log(p)
            }
           })

           dbll.collection('tasks').find({}).toArray(function(err, docs){
             var i,j;
            console.log(JSON.stringify(docs[0].members[0].id))
            for(i in docs){
            for(j in docs[i].members)
            {
             // console.log(JSON.stringify(docs[i].members[j].id))
              const T=docs[i]
              const t=JSON.stringify(docs[i].members[j].id)
              if(t==p)
              {//console.log(t)
               console.log(T.title)
               console.log(T.deadline)
               console.log(T.descriptio)
               console.log(docs[i].members[j].name)
             }
            }

           }
           } )

    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)

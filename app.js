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
            }
           })
           dbll.collection('tasks').find({}).toArray(function(err, docs){
             var i,j;
            for(i in docs){
            for(j in docs[i].members)
            {
              const T=docs[i]
              const t=JSON.stringify(docs[i].members[j].id)
              const tt=docs[i].members[j].subtasks
              if(t==p)
              {
               for(k in T.resources)
               {  const res=JSON.stringify(T.resource[k])
                 console.log(res)
               }
              for(k in tt)
                {   var taskdone,nooftasks;
                ////  console.log(tt[k].title)
                  ////console.log(JSON.stringify(tt[k].status))
                  const status=JSON.stringify(tt[k].status)
                  if(status)
                  {
                      taskdone=taskdone+1
                  }
                }
                nooftasks=tt.length
               // console.log(taskdone)
               //console.log(nooftasks)
               const percentage=(taskdone/nooftasks)*100
               ///console.log(percentage)
               const title=T.title
               const deadline=JSON.stringify(T.deadline)
               const description=T.description
               const name=docs[i].members[j].name
             }}
            }
           })
           
    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)

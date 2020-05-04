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
 
    res.render('server',{Nme:"",Title:"",Deadline:"",Description:"",Percentage:"",Arrayoftitle:""})
})

 app.post('/display',(req,res) => {
     MongoClient.connect(uri ,(err,db) => {
         if (err) throw err
         let dbll = db.db("atom")
         let query = {
             name : req.body.name
         }

         dbll.collection('users').findOne(query ,(dbErr,result) => {
            if(dbErr) 
            {throw dbErr}
            else
            { p=JSON.stringify(result._id);
            }
           })
           dbll.collection('tasks').find({}).toArray(function(err, docs){
             var i,j;
           //  var docss=docs
             console.log(docs.members)
            for(i=0;i<docs.length;i++){
            for(j=0;j< docs[i].members.length;i++)
            {
              console.log(JSON.stringify(docs[i].members[j].id))
              var T=docs[i]
              var t=JSON.stringify(docs[i].members[j].id)
              var tt=docs[i].members[j].subtasks
              if(t==p)
              {console.log(t)
                console.log(T.title)
                console.log(JSON.stringify(T.deadline))
                console.log(T.description)
              // resourcess
              // for(k in T.resources)
              // {  const rs=T.resource[k]
              //   console.log(res)
              // }
              for(k =0;k<tt.length;k++)
              {   var taskdone,nooftasks;
               var arrayoftitle=[]  
              // arrayoftitle.push(tt[k].title)
             arrayoftitle[k]=tt[k].title
               console.log(tt[k].title)
                console.log(JSON.stringify(tt[k].status))
                const status=JSON.stringify(tt[k].status)
                if(status)
                {
                    taskdone=taskdone+1
                }
              }
              nooftasks=tt.length
              console.log(taskdone)
             console.log(nooftasks)
             var percentage=(taskdone/nooftasks)*100
             console.log(percentage)
             var title=T.title
             var deadline=JSON.stringify(T.deadline)
              var description=T.description
             var nme=docs[i].members[j].name
          
           var Percentage=[]
           var Title=[]
           var Deadline=[]
           var Description=[]
           var Nme=[]
           Percentage[i]=percentage
           Title[i]=title
           Deadline[i]=deadline
           Description[i]=description
           Nme[i]=nme
          }}
           
          res.render('server',{Nme:Nme,Title:Title,Deadline:Deadline,Description:Description,Percentage:Percentage})
           
          }
        //// res.render('server',{nme:nme,title:title,deadline:deadline,description:description,percentage:percentage})
        })
       /// dbll.close()
                   //// res.render('server',{nme:nme,title:title,deadline:deadline,description:description,percentage:percentage})
    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)

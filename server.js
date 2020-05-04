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
  res.sendFile(__dirname+'/server.html')
 // res.render('server',{ar:""})
})

 app.post('/display',(req,res) => {
     MongoClient.connect(uri ,(err,db) => {
         if (err) throw err
         let dbll = db.db("atom")
         let query = {
             name : req.body.name
         }
         var p;
         console.log(req.body.name);
         dbll.collection('users').findOne(query ,(dbErr,result) => {
            if(dbErr) 
            {throw dbErr}
            else
            {
              console.log("result from db",result)
               p=JSON.stringify(result._id);
            }
           })
           dbll.collection('tasks').find({}).toArray(function(err, docs){
             var i,j;
             var docss=docs
             var arr=[];
            for(i in docs){
            for(j in docs[i].members)
            {
              console.log(JSON.stringify(docs[i].members[j].id))
              var T=docs[i]
              var t=JSON.stringify(docs[i].members[j].id)
              var tt=docs[i].members[j].subtasks
              if(t==p)
              {console.log(t)
                console.log("deee",T.title)
                console.log(JSON.stringify(T.deadline))
                console.log(T.description)
      
                arr.push({"Title":T.title,"Deadline":T.deadline,"Description":T.description})
                
              // resourcess
              // for(k in T.resources)
              // {  const rs=T.resource[k]
              //   console.log(res)
              // }
              for(k in tt)
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


console.log("my array",arr)
           }}
           res.render('server',{data:arr})
   //  res.render('server',{Nme:Nme,Title:Title,Deadline:Deadline,Description:Description,Percentage:Percentage})
           
          }
        })
    })
 })

app.listen(port, (req,res) => {
console.log(`Server running `)}
)

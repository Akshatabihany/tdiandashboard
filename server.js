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

 app.post('/displaypost',(req,res) => {
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
              console.log("result from db",result._id)
               p=result._id;
           dbll.collection('tasks').find({}).toArray(function(err, docs){
            //  var i,j;
             var docss=docs
            //  console.log(docss);
             var arr=[];
            docss.forEach((i)=>{
              var m=i.members;
              m.forEach((j)=>{

                console.log(i.title,"=>",JSON.stringify(j));
              
                var t=j.id;
                console.log(t,"====",j.id);
                // var tt=docs[i].members[j].subtasks
                if(t==p)
                {// {console.log(t)
                  // console.log("deee",i.title)
                  console.log("after match",i.title)
                  // console.log(T.description)
  
                arr.push({"Title":i.title,"Deadline":i.deadline,"Description":i.description})
                }
              })
            })
            console.log(arr);
            res.render("server",{data:arr})
                })
            }
          })
        })
      })
  
              
                
              // resourcess
              // for(k in T.resources)
              // {  const rs=T.resource[k]
              //   console.log(res)
              // }
            //   for(k in tt)
            //   {   var taskdone,nooftasks;
            //    var arrayoftitle=[]  
            //   // arrayoftitle.push(tt[k].title)
            //  arrayoftitle[k]=tt[k].title
            //    console.log(tt[k].title)
            //     console.log(JSON.stringify(tt[k].status))
            //     const status=JSON.stringify(tt[k].status)
            //     if(status)
            //     {
            //         taskdone=taskdone+1
            //     }
            //   }
            //   nooftasks=tt.length
            //   console.log(taskdone)
            //  console.log(nooftasks)
            //  var percentage=(taskdone/nooftasks)*100
            //  console.log(percentage)
            //  var title=T.title
            //  var deadline=JSON.stringify(T.deadline)
            //   var description=T.description
            //  var nme=docs[i].members[j].name


            //  var Percentage=[]
            //  var Title=[]
            //  var Deadline=[]
            //  var Description=[]
            //  var Nme=[]
            //  Percentage[i]=percentage
            //  Title[i]=title
            //  Deadline[i]=deadline
            //  Description[i]=description
            //  Nme[i]=nme


// console.log("my array",arr)
//            }}
//           //  res.render('server',{data:arr})
//           res.json(arr);
//    //  res.render('server',{Nme:Nme,Title:Title,Deadline:Deadline,Description:Description,Percentage:Percentage})
           
//           }
//         })
//     })
//  })

app.listen(port, () => {
console.log(`Server running `)}
)

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
             name : req.body.name,
         }
         dbll.collection('users').findOne(query ,(dbErr,result) => {
            if(dbErr) throw dbErr
             console.log(result)
             if(result){ 
                res.render('server',{name : result._id})
             } else {
                 res.render('server',{name:'not found'})
             }

              let checkid=result._id
              console.log(checkid)
              let q={ 
                  
                $where:  this.members[0]._id.toString() ==checkid.toString()
                //checkid : members[0]._id
              }
            dbll.collection('tasks').findOne(q,(dberr,resultt)=>
            {
                if(dberr) throw dberr
                if(resultt)
                {
                    console.log("found")
                }else{
                    console.log("fds")
                }
            })
         })
     })
    })

// app.post('/display',(req,res) => {

//     MongoClient.connect(uri ,{useUnifiedTopology:true},(err,db) => {
//         if (err) throw err
//         let dbll = db.db("atom")
//         dbll.tasks,user .find({
//             "$where": "this. tasks.members._id  == this.user._id"
//         },{
//             "task.title": 1,
//             "": 1
//         }
//         );
//         if(dbErr) throw dbErr
//         console.log(result)
//         if(result){ 
//             res.render('server',{name : result})
//         } else {
//             res.render('server',{name:'not found'})
//         }
//         })
//     })


app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

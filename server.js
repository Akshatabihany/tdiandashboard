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
             console.log(p)}
            })

            
            let qury = {}

            dbll.collection("tasks").find(qury).toArray((dbErr,result) => {
                if(dbErr) throw dbErr
                if(result)
                res.render('server',{'tasks' : result})
                else
                res.render('server',{'tasks' : "xcvb"})
                db.close()
        })
         })


    //    const cursor = db.collection('inventory').find({
    //     'size.h': { $lt: 15 }
    //   });
    //    dbll.collection('tasks').findOne(query ,(dbErr,resultt) => {
    //     if(dbErr) throw dbErr
    //     else
    //     p=JSON.stringify(resultt._id);
    //     console.log(result._id)
    //      console.log(p)
////
 //    var allid = dbll.collection('tasks').find({}).toArray();
  ///   console.log(allid)
//  let q={
//     'members.id'.valueOf():p
//  }
    
//             const cursor=dbll.collection('tasks').find(q)
//             .project({'member.name':1})
//              console.log(cursor)
        //   if(cursor){ 
        //          res.render('server',{name :cursor})
        //       } else {
        //           res.render('server',{name:'not found'})
        //       }

        //   ,(err,resultt)=>
        //  {
        //     if(dbErr) throw dbErr
        //     else
        //     console.log(resultt)
        //  })
        })
             // if(result){ 
            //     res.render('server',{name : result._id})
            //  } else {
            //      res.render('server',{name:'not found'})
            //  }

            //   let checkid=result._id
            //   console.log(checkid)
            //   let q={ 
                  
            //     $where:  this.members[0]._id.toString() ==checkid.toString()
            //     //checkid : members[0]._id///
            //     ////
            //   }
            // dbll.collection('tasks').findOne(q,(dberr,resultt)=>
            // {
            //     if(dberr) throw dberr
            //     if(resultt)
            //     {
            //         console.log("found")
            //     }else{
            //         console.log("fds")
            //     }
            // })
         ////})
    
// app.post('/display',(req,res)=>
// {
    
//     MongoClient.connect(uri ,(err,db) => {
//         if (err) throw err
//         let dbll = db.db("atom")
//         dbll.collection('tasks').find({$where:function()
//         {
//             if(this.members.id=='5e947949c4725f26f47bd81d')
//                console.log("found")
//         }})
// })

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
    


app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

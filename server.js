const express = require('express');
const app = express();
const mongodb = require('mongodb');
const port = 2000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs')
const MongoClient = mongodb.MongoClient
const uri = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
app.get('/display', (req, res) => {
  res.sendFile(__dirname + '/server.html')
  // res.render('server',{ar:""})
})

app.post('/displaypost', (req, res) => {
  MongoClient.connect(uri, (err, db) => {
    if (err) throw err
    let dbll = db.db("atom")
    let query = {
      name: req.body.name
    }
    var name = name;
    var p;
    console.log(req.body.name);
    dbll.collection('users').findOne(query, (dbErr, result) => {
      if (dbErr) { throw dbErr }
      else {
        console.log("result from db", result._id)
        p = result._id;
        dbll.collection('tasks').find({}).toArray(function (err, docs) {
          var docss = docs
          var arr = [];
          var arrayy = [];
          docss.forEach((i) => {
            var m = i.members;
           
            m.forEach((j) => {
              console.log(i.title, "=>", JSON.stringify(j));
              //resources
              var arrr = []
              arrr.push(i.resources[0])
              arrr.push(i.resources[1])
              console.log(arrr)
              ////
              var t = j.id;
              console.log(t, "====", j.id);
              if (t == p) {
                var l = j.subtasks
                var totaltask = l.length
                var taskdone
                var arrayy = []
                var o
                l.forEach((o) => {
                  arrayy.push({ "status": o.status, "subname": o.title })
                  if (stat) { taskdone = taskdone + 1 }
                })
                console.log(arrayy)
                percentage = (taskdone / totaltask) * 100
              }
              //bugs
              if (t == p) {
                var l = j.bugs
                var arrayyy = []
                var o
                l.forEach((o) => {
                  arrayy.push({ "Status": o.Status, "title": o.title, "Startdate": o.Startdate, "Deadline": o.deadline })
                })
                console.log(arrayyy)
              }
              //bugs  
           
              arr.push({ "Title": i.title, "Deadline": i.deadline, "Description": i.description, "Domain": i.Domain, "arrayy": arrayy, "arrr": arrr,"arrayyy":arrayyy })
            })
  

          })
          
        res.render("server", { data: arr})
        })
    
       // res.render("server", { data: arr})
      }})
    //  res.render("server", { data: arr})
  })
})




app.listen(port, () => {
  console.log(`Server running `)
})


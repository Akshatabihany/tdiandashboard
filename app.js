const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const port=3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("atom").collection("users");
    console.log("sdf");
    // perform actions on the collection object
   client.close();
  });

app.get('/display',(req,res) => {
    
    MongoClient.connect(url,(err,db) => {
        if (err) throw err

        let dbo = db.db("atom")
        let query = {}

        dbo.collection("users").find(query).toArray((dbErr,result) => {
            if(dbErr) throw dbErr

            res.render('index',{'users' : result})

            db.close()
        })
    })
})
//////app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// app.listen(2000,(req,res)=>
//     {
//         console.log("hh")
//     })

  
    
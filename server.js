const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const port=3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://atom:atom@cluster0-5i0bk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
app.get('/display',(req,res)=>
{
    res.sendFile(__dirname+'/server.html')
}
)
app.get('/display',(req,res) => {

    MongoClient.connect(uri ,(err,db) => {
        if (err) throw err
        let dbll = db.db("atom")
        let query = {
            name : req.body.name
        }
        dbll.collection('users').find(query ,(dbErr,result) => {
            if(dbErr) throw dbErr
            res.render('server',{name : 'result.name'
        })
        console.log("ll")
            db.close()
        })
    })
})

var server=app.listen(port, () => console.log(`E`))

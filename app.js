const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs')
const bodyParser = require('body-parser');

app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));


var entries = [];
app.locals.entries = entries;

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/add-Post',(req,res) =>{
    res.render('publisher');
})
app.post('/add-Post', (req,res) => {
    if(!req.body.title || !req.body.content){
        res.status(400).send("Entries must have a tittle and a body");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.content
    });
    res.redirect('/');
})
app.listen(8080,() => console.log("Running"))
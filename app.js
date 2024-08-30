const express = require('express');
const path = express('path');

const app = express();
const ejs = require('ejs');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index')
})
app.listen(8080,    () => console.log("Running"))
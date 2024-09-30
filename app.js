const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGODURL = 'mongodb://localhost:27017/test';
const BlogPosts = require("./models/BlogPost");
const Register = require("./models/Register")



app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


mongoose.connect(MONGODURL);

BlogPosts.find().then(posts => {
    posts.forEach(post => {
        entries.push({
            title: post.title,
            content: post.content
        })
    } )
    
}).catch(err => {console.log(err);
})
var entries = [];
var log_in = [];
var verified = false;
app.locals.entries = entries;
app.locals.log_in = log_in;
app.locals.verified = verified;


app.get('/',(req,res)=>{
    res.render('index',{user_id:""});
})
app.get('/add-Post/:user',(req,res) =>{
    res.render('publisher',{user_id:req.params.user});
})
app.post('/add-Post/:user', async (req,res) => {
    try {
        if(!req.body.title || !req.body.content){
            res.status(400).send("Entries must have a tittle and a body");
            return;
        }

        const newBlog = new BlogPosts({user_id:req.params.user,title:req.body.title,content:req.body.content});
        entries.push({
            id:newBlog._id,
            user_id:req.params.user,
            title: req.body.title,
            content: req.body.content
        });
        await newBlog.save();
        res.redirect(`/inicio/${req.params.user}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
app.get('/get-blogpost/:idblog/:iduser', async(req,res) => {
    try {
        
        await BlogPosts.findById({_id:req.params.idblog})
        await BlogPosts.findOne({user_id:req.params.iduser});
        res.status(200).send()
    } catch (error) {
        res.status(400).send("Error deleting post: " + error.message);
    }
})

app.delete('/delete-post/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      await BlogPosts.findByIdAndDelete({_id:postId});
      res.status(200).send({ message: 'Post eliminado correctamente' });
    } catch (error) {
      res.status(500).send("Error deleting post: " + error.message);
    }
  });
app.get('/log-in-verification/:user/:password', async (req,res)=>{
    try {
        
        const user = req.params.user;
        const password = req.params.password;
        console.log(user + password);
        
        if (await Register.findOne({user_id:user,password:password})){
            res.send('index')
        }
        else{
            console.log('Error credenciales');
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
})
app.get('/inicio/:user',(req,res)=> {
    res.render('index',{user_id: req.params.user})

})
app.get('/log-in', (req,res) => {
    res.render('log-in')
})


app.get('/register', (req,res) => {
    res.render('register')
})
app.post('/register',async (req,res) =>{
    try {
        const user = req.body.user;
        const password = req.body.password;
        const newUser = new Register({user_id:user,password:password});
        await newUser.save();
        verified = true;
        res.render("index")

    } catch (error) {
        console.log(error);
        
    }
})


app.listen(8080,() => console.log("Running"))
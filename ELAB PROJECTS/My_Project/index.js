const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/post');
const expressEdge = require('express-edge');
const app = new express();
const fileUpload = require("express-fileupload");
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');

app.use(express.static('public'));
mongoose.connect('mongodb+srv://shubham1:Shubham2157@shubham-uqgnc.mongodb.net/test?retryWrites=true',{
    useNewUrlParser:true
})
.then(() => 'You are now connected to Mongo!')
.catch(err => console.error('Something went wrong', err));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});



app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/posts/store', (req, res) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description ,
        content:req.body.content
    });
    res.send(post);
    
    post.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "successful Entry",
            createdPost: result
        });
    }).catch(err => console.log(err));
    res.redirect('/')
    
});

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});
app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/signup.html'));
});
app.get("/auth/register", createUserController);


app.post("/users/register", storeUserController);
app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files
 
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});


app.use(fileUpload());
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.listen(4000, () => {
    console.log('App listening on port 4000')
});

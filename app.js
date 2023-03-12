//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog! My name is Hariharan, and I'm a passionate developer who loves to share my knowledge and experiences with the world. Through this blog, I hope to inspire and educate my readers on a variety of topics, from web development and software engineering to technology trends and programming tips. I invite you to join me on this journey of discovery and learning, and I look forward to connecting with you through my writing.";
const aboutContent = "Hi there, my name is Hariharan! I'm a developer based in india, with a passion for all things tech. I love exploring new programming languages, tools, and frameworks, and experimenting with different ways of building applications."
"In my free time, you can usually find me tinkering with side projects, reading tech blogs, or watching tutorials on the latest development trends. I'm also an avid gamer, and I enjoy playing video games in my spare time."
"Through this blog, I hope to share my knowledge and experience with other developers and tech enthusiasts, and inspire them to pursue their own passions and projects. Whether you're just starting out in the world of development, or you're a seasoned pro looking for new challenges, I'm here to support and encourage you on your journey.";
const contactContent = "Thank you for visiting my blog! I would love to hear from you, whether you have questions, comments, or just want to say hello. Feel free to contact me using any of the methods below:"
const homecontents=[];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res)
{
  res.render('home',{content:homeStartingContent,post:homecontents});
})
app.get("/posts/:topic",function(req,res)
{
  let topic=req.params.topic;
  homecontents.forEach(ele=>{
    if(_.lowerCase(ele.title)===_.lowerCase(topic))
    {
      res.render('post',{post:ele});
    }
  })
})

app.get("/about",function(req,res)
{
  res.render('about',{content:aboutContent});
})

app.get("/contact",function(req,res)
{
  res.render('contact',{content:contactContent});
})
app.get("/compose",function(req,res)
{
  res.render('compose');
})
app.post("/compose",function(req,res)
{
    let Contents={
      title:req.body.title,
      con:req.body.content
    };
    homecontents.push(Contents);
    res.redirect("/")
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

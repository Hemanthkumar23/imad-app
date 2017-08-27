var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'phemanthkumar23',
    database:'phemanthkumar23',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
'article-one' : { 
    title: ' Article one |  Hemanth kumar ',
    heading: 'Article one',
    date: 'Sep 5,2017',
    conent: '<p>This is the content for my first article.</p>' },
'article-two' : { 
    title: ' Article two |  Hemanth kumar ',
    heading: 'Article two',
    date: 'Sep 15,2017',
    conent: '<p>This is the content for my second article.</p>' },
'article-three' : { 
    title: ' Article three |  Hemanth kumar ',
    heading: 'Article three',
    date: 'Sep 25,2017',
    content: '<p>This is the content for my third article.</p>' } 
    };
function createTemplate (data) { 
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate = `<html>
    <head>
        <title>
            Article-one | Hemanth kumar
        </title>
        <meta name='viewport' content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
      
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
               <p> ${content} </p>
            </div>
            </div>
    </body>
</html>`;
return htmlTemplate;
}
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname,'ui','index.html'));
});
var pool = new Pool(config);
app.get('/test-do', function (req, res) {
pool.query('select * from test',function(err, result) {
if(err)  {
    res.status(500).send(err.toString());
  }
  else
  {
      res.send(JSON.stringify(result.rows));
  }
});
});

var counter = 0;
app.get('/counter', function (req, res) {
counter = counter + 1;
res.send(counter.toString());
});
var names = [];
app.get('/submit-name', function (req, res) {
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
   });
   
app.get('/articles/:articleName', function (req, res) {
 pool.query("Select * from article where title = $1",[req.perams.articleName], function(err, result) {
if(err) {
    res.status(500).send(err.toString());
} else {
  if(result.rows.lenght === 0) {
  
      res.status(404).send('Article not found'); }
    else  {
        var articleData = result.rows[0];
        res.send(createTemplate(articleData));
    }
  }  

   });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool ;

var config = {
    user: 'kanishk25',
    database: 'kanishk25',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD 
}
var app = express();
app.use(morgan('combined'));

var articles =  {
    'article-one' : {
        title: 'Article One | Kanishk Vats',
        heading: 'Article One',
        content: `
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                `
    },
    'article-two' : {
        title: 'Article Two | Kanishk Vats',
        heading: 'Article Two',
        content: `
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                `
    },
    'article-three' : {
        title: 'Article Three | Kanishk Vats',
        heading: 'Article Three',
        content: `
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                    <p>
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                        This is the content.This is the content.This is the content.
                    </p>
                `
    }
};

function createTemplate (data){
    
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class = "container">
                    <div>
                        <a href = '/'> Home </a>
                    </div>
                    
                    <hr />
                    
                    <h3>${heading}</h3>
                    
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
        </html>
    `
    return htmlTemplate ;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config) ;
app.get("/test-db", function(req, res){
    // make a select request
    // return a response with the results
    
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString()) ;
        } else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name/', function(req, res){
    // get the name from the request
    var name = req.query.name ;
    names.push(name) ;
    res.send(JSON.stringify(names)) ;
});

app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

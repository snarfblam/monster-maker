var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var orm = require('./config/orm');

var app = express();
var PORT = process.env.PORT || 8080;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Temp route
app.get('/', function (req, res) {
    res.render('index');
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var ormConnection = orm.connect();

var server = app.listen(PORT, function () {
    console.log("Server listening on " + PORT);
    ormConnection.then(function () {
        console.log("Database connected");
    }).catch(err => {
        console.log("Could not connect to database:", err);
    });
});
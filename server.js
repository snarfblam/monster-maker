var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var orm = require('./config/orm');
var monster = require('./models/monster');
var party = require('./models/party');
var controller = require('./controllers/partyController');

var app = express();
var PORT = process.env.PORT || 8080;

var hbs = handlebars({
    
    helpers: {
        toJSON : function(object) {
            return JSON.stringify(object);
          },
    },
    defaultLayout: 'main'
});

app.engine('handlebars', hbs);

app.set('view engine', 'handlebars');

// // Temp route
// app.get('/', function (req, res) {
//     res.render('index');
// });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(controller);

var ormConnection = orm.connect();

var server = app.listen(PORT, function () {
    console.log("Server listening on " + PORT);
    ormConnection.then(function () {
        console.log("Database connected");

        // orm.select().from("monsters").whereEquals("partyId", 1).then(results => console.log(results));
        // var query = orm.update('monsters', { name: "Golem" }).whereEquals("name", "Gollem");
        // console.log(query.sql);
        // console.log(query.values);
        // query.then(results => console.log(results));
        // monster.getById(4).then(mon => {
        //     console.log("got", mon);
        //     mon.name = "Gollem";
        //     monster.update(mon).then(r => {
        //         console.log("Updated", mon);
        //     });
        // });
        // party.create({ name: 'test' }).then(result => {
        //     console.log('created', result);
        //     result.name = "testy";
        //     party.update(result).then(updateResult => {
        //         console.log('updated', updateResult);
        //     });
        // });

        // var query = orm.select(
        //     orm.table('monsters').col('id').as('number'),
        //     orm.table('monsters').col('name').as('title')
        // ).from('monsters');
        
        // console.log(query.values);
        // console.log(query.sql);
        // query.then(result => console.log(result));

        // var query = orm.select(
        //     'partyId',
        //     'head',
        //     'body',
        //     'eyes',
        //     'active',
        //     'monsters.name',
        //     'monsters.id',
        //     orm.as('parties.name', 'partyName'))
        //     .from('parties')
        //     .innerJoin('monsters')
        //     .onEquals('monsters.partyID', 'parties.id');
        
        // console.log(query.sql);
        // console.log(query.values);
        // query.then(r => console.log(r));
        party.getWithMonsters(1, true).then(data => {
            console.log(data.party);
            console.log(data.monsters);
        });
    }).catch(err => {
        console.log("Could not connect to database:", err);
    });
});
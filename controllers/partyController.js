var express = require('express');
var party = require('../models/party');
var monster = require('../models/monster');

var router = express.Router();

router.get('/', function (req, res) {
    var partyId = null;
    
    // get party list and pre-render sample (or whatever the first may be) party
    var partyList;
    var selectedParty;
    var activeMonsterList = [];
    var inactiveMonsterList = [];

    party.getAll().then(partyData => {
        partyList = partyData;
        selectedParty = partyList[0];
        partyId = partyId || selectedParty.id;
        return party.getWithMonsters(partyId);
    }).then(partyMonsterData => {
        partyMonsterData.monsters.forEach(mon => {
            if (mon.active) {
                activeMonsterList.push(mon);
            } else {
                inactiveMonsterList.push(mon);
            }
        });

        res.render('index', {
            currentParty: partyId,
            parties: partyList,
            monsters: partyMonsterData.monsters,
        });
    }).catch(err => {
        console.log("ERROR RENDERING INDEX: ", err);
        res.render('error');
        // error response here (or 200 with there-was-a-problem notification)
    });
});

// router.get('api/parties', function (req, res) {
//     party.getAll().then(partyData => {

//     });
// });

router.post('/api/monster/', function (req, res) {
    var monsterData = req.body;
    console.log(monsterData);
    res.send(200).end();
    // res.send(404).end();
});

module.exports = router;


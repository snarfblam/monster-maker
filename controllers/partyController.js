var express = require('express');
var party = require('../models/party');
var monster = require('../models/monster');

var router = express.Router();

router.get('/', function (req, res) {
    // get party list and pre-render sample (or whatever the first may be) party
    var partyList;
    var selectedParty;
    var activeMonsterList = [];
    var inactiveMonsterList = [];

    party.getAll().then(partyData => {
        partyList = partyData;
        selectedParty = partyList[0];
        return party.getWithMonsters(selectedParty.id);
    }).then(partyMonsterData => {
        partyMonsterData.monsters.forEach(mon => {
            if (mon.active) {
                activeMonsterList.push(mon);
            } else {
                inactiveMonsterList.push(mon);
            }
        });

        res.render('index', {
            parties: partyList,
            monsters: partyMonsterData.monsters,
        });
        // render here
    }).catch(err => {

        // error response here (or 200 with there-was-a-problem notification)
    });
});

module.exports = router;


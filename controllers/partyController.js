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

/** API endpoint to add a monster to a party 
 * 
 * return: { result: 'added' | 'error', error?: string}
*/
router.post('/api/monster/', function (req, res) {
    var monsterData = req.body;
    console.log(monsterData);

    if (!monster.validate(monsterData) || monster.hasOwnProperty('id')) {
        res.json({
            result: 'error', error: 'Invalid monster data',
        });
        return;
    }

    party.getWithMonsters().then(data => {
        var count = data.monsters.length;
        if (count >= 4) {
            res.json({ result: 'error', error: 'party at capacity' });
        } else {
            monster.create(monsterData).then(function () {
                res.json({ result: 'added' });
            });
        }
    }).catch(err => {
        console.log(err);
        res.json({ result: 'error', error: 'runtime error' });
    });
});

module.exports = router;


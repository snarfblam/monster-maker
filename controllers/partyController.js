var express = require('express');
var party = require('../models/party');
var monster = require('../models/monster');

var router = express.Router();


var results = {
    added: { result: 'added' },
    updated: { result: 'updated' },
    error_invalid: { result: 'error', error: 'invalid data' },
    error_runtime: { result: 'error', error: 'runtime error' },
    error_atCapacity: { result: 'error', error: 'party at capacity' },
};

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

    // Validate passed-in object
    if (!monster.validate(monsterData) || monster.hasOwnProperty('id')) {
        res.json(results.error_invalid);
        return;
    }

    // Get party info to ensure party hasn't exceeded limit
    party.getWithMonsters().then(data => {
        var count = data.monsters.length;
        if (count >= 4) {
            res.json(results.error_atCapacity);
        } else {
            monster.create(monsterData).then(function () {
                res.json(results.added);
            });
        }
    }).catch(err => {
        console.log(err);
        res.json(results.error_runtime);
    });
});

/** API endpoint to update a monster.
 * return: { result: 'updated' | 'error', error?: string}
*/
router.post('/api/monster/:id', function (req, res) {
    var newData = req.body;
    newData.id = req.params.id;

    if (monster.validate(newData)) {
        monster.update(newData).then(result => {
            res.json({ result: 'updated' });
        }).catch(err => {
            res.json(results.error_runtime);
        });
    } else {
        res.json(results.error_invalid);
    }
});

/** API endpoint to create a new party */
router.post('/api/party', function (req, res) {
    var newData = req.body;
    if (!party.validate(newDAta, false)) {
        res.json(results.error_invalid);
        return;
    }

    party.create(newData).then(result => {
        res.json(results.added);
    }).catch(err => {
        console.log(err);
        res.json(results.error_runtime);
    });
});

module.exports = router;

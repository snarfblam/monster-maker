var orm = require('../config/orm');
var monster = require('./monster');


var party = {
    /** Returns a promise that resolves to an array of party objects. */
    getAll: function () {
        return orm.select().from('parties').run();
    },

    /** Returns a promise that resolves to a party object, or undefined
      * if the object is not found. */
    getById: function (id) {
        return orm.select().from('parties').whereEquals('id', id).then(results => {
            return results[0];
        });
    },

    /** Returns a promise that resolves to {party, monsters[]}, or undefined if not found. */
    getWithMonsters: function (id) {
        var query = orm.select(
            orm.as('parties.id', 'partyId'),
            'head',
            'body',
            'eyes',
            'active',
            'monsters.name',
            'monsters.id',
            'habitat',
            orm.as('parties.name', 'partyName'))
            .from('parties')
            .leftJoin('monsters')
            .onEquals('monsters.partyID', 'parties.id')
            .whereEquals('parties.id', id);
        
        return query.then(data => {
            if (data.length == 0) return undefined;

            var result = {
                party: {
                    name: data[0].partyName,
                    habitat: data[0].habitat,
                },
                monsters: [],
            }

            data.forEach(row => {
                // Duplicate row and remove the party columns and we have a monster
                var monster = Object.assign({}, row);
                delete monster["partyName"];
                delete monster["habitat"];

                result.monsters.push(monster);
            });

            return result;
        });
    },

    /** Accepts a party object ({name: string, habitat: number}) without an id. Resolves when
     * the record is created. The party object will be updated with an id.     */
    create: function (party) {
        if (party.hasOwnProperty('id')) {
            throw Error("id should not be specified when creating a party.");
        }

        return orm.insertInto('parties', party).then(result => {
            party.id = result.insertId;
            return party;
        });
    },

    /** Accepts a party object (with id), and returns a promise that resolves
      * when the update is complete. */
    update: function (party) {

        if (!party.hasOwnProperty('id')) {
            throw Error("id must be specified when updating a monster.");
        }

        return orm.update('parties', party).whereEquals('id', party.id).run();
    },

    validate: function (party, requireId) {
        var valid = (typeof party.name == 'string') && (typeof party.habitat == 'number');
        if (requireId) valid = valid && (typeof party.id == 'number');

        return valid;
    }
};

module.exports = party;
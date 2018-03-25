var orm = require('../config/orm');

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

    /** Accepts a party object ({name: string}) without an id. Resolves when
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
};

module.exports = party;
var orm = require('../config/orm');

var monster = {
    /** Returns a promise that resolves with a monster object array */
    getAll: function () {
        return orm.select().from('monsters').run();
    },

    /** Returns a promise that resolves with a monster object or undefined
      * if the object is not found.     */
    getById: function (id) {
        return orm.select().from('monsters').whereEquals("id", id).then(result => {
            return result[0];
        });
    },

    /** Accepts a monster object (without id), and returns a promise that
      * resolves with that monster object. The monster object will be updated
      * with the inserted id. */
    create: function (monster) {
        if (monster.hasOwnProperty('id')) {
            throw Error("id should not be specified when creating a monster.");
        }

        return orm.insertInto('monsters', monster).then(result => {
            monster.id = result.insertId;
            return monster;
        });
    },

    /** Accepts a monster object (with id), and returns a promise that resolves
      * when the update is complete. */
    update: function (monster) {
        if (!monster.hasOwnProperty('id')) {
            throw Error("id must be specified when updating a monster.");
        }

        return orm.update('monsters', monster).whereEquals('id', monster.id).run();
    },

    /** Returns a boolean indicating whether the object is a valid monster. */
    validate: function (monster, requireId) {
        var properties = ['head', 'body', 'eyes', 'partyId', 'name', 'active'];
        properties.forEach(p => {
            if (!monser.hasOwnProperty(p)) return false;
        });

        return true;
    }
}

module.exports = monster;
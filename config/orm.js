var MonsterDbConnection = require('./MonsterDbConnection');
var mysql = require('mysql');

var connection = new MonsterDbConnection();

var select = function () {
    var query = new OrmQuery();
    return query.select(Array.prototype.slice.call(arguments));
};

var insertInto = function (table, values) {
    var query = new OrmQuery();
    return query.insertInto(table, values);
}

function OrmQuery() {
    this.sql = "";
    this.values = [];
} { // Methods
    OrmQuery.prototype.select = function () {
        var args = arguments;
        if (arguments.length == 1 && Array.isArray(arguments[0])) args = arguments[0];

        if (args.length == 0) {
            this.sql += "SELECT * ";
        } else {
            this.sql = "SELECT ??";
            this.values.push(args[0]);

            for (var i = 1; i < args.length; i++) {
                this.sql += ", ??"
                this.values.push(args[i]);
            }
        }

        return this;
    };

    OrmQuery.prototype.from = function (table) {
        this.sql += " from ??";
        this.values.push(table);

        return this;
    };

    OrmQuery.prototype.whereEquals = function (column, value) {
        this.sql += " where ?? = ?";
        this.values.push(column);
        this.values.push(value);

        return this;
    };

    OrmQuery.prototype.insertInto = function (table, rowValues) {
        this.sql = "INSERT INTO ??";
        this.values.push(table);

        var names = Object.keys(rowValues);
        if (names.length == 0) throw Error("No values specified.");

        this.sql += " (";
        var first = true;
        names.forEach(name => {
            this.sql += first ? ('??') : (', ??');
            first = false;

            this.values.push(name);
        });

        this.sql += ") VALUES (";

        first = true;
        names.forEach(name => {
            this.sql += first ? ('?') : (', ?');
            first = false;

            this.values.push(rowValues[name]);
        });

        this.sql += ")";

        return this;
    };

    OrmQuery.prototype.update = function (table, rowValues) {
        this.sql = "UPDATE ?? SET ";
        this.values.push(table);

        var names = Object.keys(rowValues);
        if (names.length == 0) throw Error("No values specified.");

        this.sql += " (";
        var first = true;
        names.forEach(name => {
            this.sql += first ? ("?? = ?") : (", ?? = ?");
            first = false;

            this.values.push(name);
            this.values.push(rowValues[name]);

        });

        return this;
    };

    OrmQuery.prototype.run = function () {
        return connection.query(this.sql, this.values);
    };

    OrmQuery.prototype.then = function (cbSuccess, cbError) {
        if (cbError) {
            return this.run().then(cbSuccess, cbError);
        } else {
            return this.run().then(cbSuccess);
        }
    }

    // todo: update
}

module.exports = {
    select: select,
    insertInto: insertInto,
    connect: function () {
        return connection.connect();
    }
}


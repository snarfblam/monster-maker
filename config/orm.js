var MonsterDbConnection = require('./MonsterDbConnection');
var mysql = require('mysql');

var connection = new MonsterDbConnection();

/** Accepts an array or argument list where each item is either a 
  * string or orm.table.col object or orm.col object specifying a
  * column to select. */
var select = function () {
    var query = new OrmQuery();
    return query.select(Array.prototype.slice.call(arguments));
};

var insertInto = function (table, values) {
    var query = new OrmQuery();
    return query.insertInto(table, values);
};

var update = function (table, values) {
    var query = new OrmQuery();
    return query.update(table, values);
};


var _asFunction = function (asName) {
    this._asname = asName;
    return this;
}

var _colFunction = function (colName) {
    this._colname = colName;
    return this;
}

var col = function (name) {
    return {
        _tablename: null,
        _colname: name,
        _asname: null,
        as: _asFunction,
    };
};

var table = function (name) {
    return {
        _tablename: name,
        _colname: null,
        _asname: null,
        as: _asFunction,
        col: _colFunction,
    };
}

function OrmQuery() {
    this.sql = "";
    this.values = [];
} { // Methods
    OrmQuery.prototype._appendCol = function (col) {
        if (typeof col == 'string') {
            this.sql += "?? ";
            this.values.push(col);
        } else {
            if (col._tablename) {
                this.sql += "??.";
                this.values.push(col._tablename);
            }

            if (!col._colname) throw Error("Column name not specified.");
            this.sql += "?? ";
            this.values.push(col._colname);

            if (col._asname) {
                this.sql += "AS ?? ";
                this.values.push(col._asname);
            }
        }
    };

    OrmQuery.prototype.select = function () {
        var args = arguments;
        if (arguments.length == 1 && Array.isArray(arguments[0])) args = arguments[0];

        if (args.length == 0) {
            this.sql += "SELECT * ";
        } else {
            this.sql = "SELECT ";

            for (var i = 0; i < args.length; i++) {
                if (i != 0) this.sql += ", ";
                // this.sql += "?? "
                // this.values.push(args[i]);
                this._appendCol(args[i]);
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
    update: update,
    table: table,
    col: col,
    connect: function () {
        return connection.connect();
    }
}


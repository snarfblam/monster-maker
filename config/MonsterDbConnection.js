var mysql = require('mysql');
var connectionConfig = require('./monsterDbConfig');

function MonsterDbConnection() {
    var jaws = process.env.JAWSDB_URL;
    if (jaws) {
        this.connection = mysql.createConnection(jaws);
    } else {
        this.connection = mysql.createConnection(connectionConfig);
    }

    this.connected = false;
} { // methods
    MonsterDbConnection.prototype.connect = function () {
        var self = this;

        return new Promise(function (resolve, reject) {
            if (self.connected) resolve(self);

            self.connection.connect(function (err) {
                if (err) {
                    reject(err);
                } else {
                    self.connected = true;
                    resolve(self);
                }
            });
        });
    }

    MonsterDbConnection.prototype.disconnect = function () {
        if (this.connected) {
            this.connection.end();
            this.connected = false;
        }
    }

    MonsterDbConnection.prototype.query = function (queryString, values) {
        var self = this;

        return new Promise(function (resolve, reject) {
            if (values) {
                var query = self.connection.query(queryString, values, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                console.log(query.sql);
            } else {
                var query = self.connection.query(queryString, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                console.log(query.sql);
            }
        });
    };
}

module.exports = MonsterDbConnection;
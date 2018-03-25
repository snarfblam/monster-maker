var mysql = require('mysql');
var connectionConfig = require('./db.json');

function MonsterDbConnection() {
    this.connection = mysql.createConnection(connectionConfig);

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
                self.connection.query(queryString, values, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                self.connection.query(queryString, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    };
}
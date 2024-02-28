'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "create_users_table",
    "created": "2024-02-06T01:05:30.220Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING(120),
                "field": "name"
            },
            "last_name": {
                "type": Sequelize.STRING(160),
                "field": "last_name"
            },
            "username": {
                "type": Sequelize.STRING(80),
                "field": "username",
                "unique": true
            },
            "email": {
                "type": Sequelize.STRING(180),
                "field": "email",
                "unique": true
            },
            "password": {
                "type": Sequelize.STRING(150),
                "field": "password"
            },
            "status": {
                "type": Sequelize.BOOLEAN,
                "field": "status",
                "defaultValue": true
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

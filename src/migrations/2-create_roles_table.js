'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "roles", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "create_roles_table",
    "created": "2024-02-07T00:36:37.192Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "roles",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING(80),
                "field": "name"
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

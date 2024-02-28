'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "role_id" on table "users"
 * changeColumn "role_id" on table "users"
 * changeColumn "role_id" on table "users"
 * changeColumn "role_id" on table "users"
 *
 **/

var info = {
    "revision": 4,
    "name": "update_users_table",
    "created": "2024-02-07T03:25:46.011Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "users",
            "role_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "roles",
                    "key": "id"
                },
                "allowNull": true,
                "field": "role_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "role_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "roles",
                    "key": "id"
                },
                "allowNull": true,
                "field": "role_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "role_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "roles",
                    "key": "id"
                },
                "allowNull": true,
                "field": "role_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "role_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "roles",
                    "key": "id"
                },
                "allowNull": true,
                "field": "role_id"
            }
        ]
    }
];

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

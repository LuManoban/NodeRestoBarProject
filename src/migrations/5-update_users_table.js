'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "avatar" to table "users"
 *
 **/

var info = {
    "revision": 5,
    "name": "update_users_table",
    "created": "2024-02-10T02:54:09.477Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "avatar",
        {
            "type": Sequelize.STRING,
            "field": "avatar",
            "allowNull": true
        }
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

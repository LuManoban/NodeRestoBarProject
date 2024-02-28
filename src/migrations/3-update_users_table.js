'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "role_id" to table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "update_users_table",
    "created": "2024-02-07T03:10:20.066Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "role_id",
        {
            "type": Sequelize.INTEGER,
            "field": "role_id"
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

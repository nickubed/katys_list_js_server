'use strict'
module.exports = (sequelize, DataTypes) => {
    const user_list = sequlize.define('user_list', {
        userId: DataTypes.INTEGER,
        listId: DataTypes.INTEGER
    }, {})
    user_list.associate = function(models) {
    }
    return user_list
}
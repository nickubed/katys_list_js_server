'use strict';
module.exports = (sequelize, DataTypes) => {
    const song = sequelize.define('song', {
        name: DataTypes.STRING,
        listId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        spotifyId: DataTypes.STRING
    }, {});
    song.associate = function(models) {
        models.song.belongsTo(models.songlist)
    };
    return song;
};
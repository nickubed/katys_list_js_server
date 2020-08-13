'use strict'

let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                args: [1, 255],
                msg: 'Please enter a valid username.'
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                args: [1, 255],
                msg: 'You can be anyone you want to be. Except for that.'
                }
            }
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isEmail: {
                msg: 'Please enter a valid email'
            }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
            len: {
                args: [6, 25],
                msg: 'Please enter a valid password.'
            }
            }
        },
        photo: DataTypes.STRING,
        admin: DataTypes.BOOLEAN
        }, {
            hooks: {
                beforeCreate: pendingUser => {
                if(pendingUser && pendingUser.password){
                    let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
                    pendingUser.password = hashedPassword
                }
                }
            }
        });
    user.associate = function(models) {
        models.user.belongsToMany(models.songlist, {through: 'user_list'})
    };

    user.prototype.validPassword = function(typedInPassword) {
        let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
        return correctPassword
        }
        return user;
    };
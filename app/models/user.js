'use strict';

const bcrypt = require('bcrypt');
const logger = require('../logger');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          isInWoloxDomain(value) {
            const woloxDomain = /^.+@wolox\.com.*$/;
            if (!value.match(woloxDomain)) throw new Error('Only wolox domains are allowed!');
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 32],
          isAlphanumeric: true
        }
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  );
  User.prototype.validPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  return User;
};

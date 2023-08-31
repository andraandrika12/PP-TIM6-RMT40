'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
const { use } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
      User.hasMany(models.Post)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'email required!'
        },
        notEmpty: {
          args: true,
          msg: 'email required!'
        },
        isEmail: {
          args: true,
          msg: 'please input Email with correct format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password required!'
        },
        notEmpty: {
          args: true,
          msg: 'Password required!'
        },
        min: {
          args: 8,
          msg: 'Password at least 8 character'
        }
      }
    },
    phone: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        let salt = bcrypt.genSaltSync(8)
        let hash = bcrypt.hashSync(user.password, salt)
        user.password = hash

        user.role = 'User'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
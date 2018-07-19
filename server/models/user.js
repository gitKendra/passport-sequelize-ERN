const bcrypt = require('bcrypt-nodejs')
module.exports = function (sequelize,Sequelize, DataTypes) {

  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(150),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING(150),
      unique: true
    }
  }, {
		tableName: 'user'
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.hasMany(models.Like, { onDelete: 'cascade', hooks: true })
      models.Message.hasMany(models.Comment, { onDelete: 'cascade', hooks: true })
      models.Message.belongsTo(models.User, { foreignKey: 'userId' })
    }

  };
  Message.init({
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    images: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
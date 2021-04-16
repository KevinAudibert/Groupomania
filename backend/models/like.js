'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.hasMany(models.Like)
      models.Like.belongsTo(models.User)
      models.Like.belongsTo(models.Message)
    }
  };
  Like.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isLike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
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
      models.Like.belongsTo(models.User, {
        foreignKey: { name:'userId', allowNull: false },        
        as: 'user',
      })

      models.Like.belongsTo(models.Message, {
        foreignKey: { name:'messageId', allowNull: false }, 
        as: 'message',
      })
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
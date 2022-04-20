const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Tag = require('./Tag');

class Favorite extends Model {}

Favorite.init ({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "tag",
          key: 'id'
      }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }
},

{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite',
});

module.exports = Favorite;

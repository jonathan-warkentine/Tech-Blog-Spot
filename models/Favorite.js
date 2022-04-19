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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "tag",
          key: 'id'
      }
    },
    post_id: {
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

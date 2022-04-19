const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Tag = require('./Tag');

class TagPost extends Model {}

TagPost.init ({

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_id: {
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
    modelName: 'tagpost',
});

module.exports = TagPost;
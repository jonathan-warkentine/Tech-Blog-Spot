const sequelize = require('../config/connection');

// const {Comment, Post, User, Tag, Favorite, TagPost} = require('./');
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const Tag = require('./Tag');
const Favorite = require('./Favorite');
const TagPost = require('./TagPost');

User.belongsToMany(Post, { //putting this many-to-many rel before the one-to-many rel through author_id appears to prioritize the one-to-many rel on queries
    as: 'favorites',
    through: Favorite
});

Post.belongsToMany(User, {
    as: 'favoriters',
    through: Favorite
});

Favorite.belongsTo(Post);
Favorite.belongsTo(User);

Post.belongsToMany(Tag, {
    through: TagPost
});

Tag.belongsToMany(Post, {
    through: TagPost
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Post.belongsTo(User, {
    foreignKey: 'author_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.hasMany(Post, {
    foreignKey: 'author_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

module.exports = {
    Comment,
    Post,
    User,
    Tag,
    Favorite,
    TagPost
}
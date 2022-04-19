const sequelize = require("../config/connection");
const {Comment, Post, User, Tag, Favorite, TagPost} = require('../models/');

const commentData = require('./comment.data.json');
const favoriteData = require('./favorite.data.json');
const postData = require('./post.data.json');
const tagPostData = require('./tagPost.data.json');
const userData = require('./user.data.json');
const tagData = require('./tag.data.json');

const seedDB = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, { //order matters here, hence also the need for 'await'
        validate: true,
        returning: true,
    });

    await Tag.bulkCreate(tagData, {
        validate: true,
        returning: true,
    });

    await Post.bulkCreate(postData, {
        validate: true,
        returning: true,
    });

    await Comment.bulkCreate(commentData, {
        validate: true,
        returning: true,
    });

    await Favorite.bulkCreate(favoriteData, {
        validate: true,
        returning: true,
    });

    await TagPost.bulkCreate(tagPostData, {
        validate: true,
        returning: true,
    });

    process.exit(0); //closes the connection and app in node to return user to the command line
};

seedDB();
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User, Tag, Favorite, TagPost} = require('../models');

router.get('/', async (req, res) => {
    let posts = await Post.findAll({
        order: sequelize.random(),
        include: ['favoriters', User, Tag]
    });
    posts = posts.map(post => post.get({plain: true}));

    console.log(posts)
    res.status(200).render('homepage', {posts});
});

router.get('/login', async (req, res) => {
    res.status(200).render('login');
})

module.exports = router;
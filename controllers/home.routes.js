const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User, Tag, Favorite, TagPost} = require('../models');

router.get('/', async (req, res) => {
    try {
        let posts = await Post.findAll({
            order: sequelize.random(),
            include: ['favoriters', Tag, User]
        });
        posts = posts.map(post => post.get({plain: true}));

        if (!req.session.user) {
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
            });
        }
        else {
            let user = await User.findByPk(req.session.user.id, {
                include: 'favorites'
            });
            user = user.get({plain: true});

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
                user
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});

router.get('/top', async (req, res) => {
    let posts = await Post.findAll({
        include: ['favoriters', User, Tag],
        order: [
            ['date', 'DESC'] 
        ]
    });
    posts = posts.map(post => post.get({plain: true}));
    
    res.status(200).render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        user: req.session.user
    });
});

router.get('/posts/:id', async (req, res) => {
    try {
        let posts = await Post.findByPk(
            req.params.id, {
                include: ['favoriters', User, Tag, {
                    model: Comment,
                    include: User
                }],
            }
        );

        if (!posts){
            res.status(404).json({'error': 'No Such Post'});
        }

        posts = posts.get({plain: true});
        console.log(posts)
        res.status(200).render('homepage', {
            posts: [posts],
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    }

    catch(error) {
        res.status(500).json(error);
    }
});

router.get('/categories', async (req, res) => {
    try {
        let tags = await Tag.findAll({
            include: Post
        });
        tags = tags.map(tag => tag.get({plain: true}));

        console.log(tags)
        res.render('categories', {
            tags,
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    }
    catch (error){
        res.status(500).json(error);
    }
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;
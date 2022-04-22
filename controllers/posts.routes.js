const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User, Tag} = require('../models');
const auth = require('../utils/auth');

router.get('/top', async (req, res) => {
    let posts = await Post.findAll({
        include: ['favoriters', User, Tag],
        // can't seem to find a way to include the count of favoriters in the query call...
        // attributes: [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.postId = post.id)'), 'num_favs']
    });
    posts = posts.map(post => post.get({plain: true}));
    posts.sort((post1, post2) => post2.favoriters.length-post1.favoriters.length); //sorts by number of 'favoriters'

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
});

router.get('/:id', async (req, res) => {
    try {
        let posts = await Post.findByPk(
            req.params.id, {
                include: ['favoriters', User, Tag, {
                    model: Comment,
                    include: User
                }],
            }
        );
        posts = posts.get({plain: true});

        if (!posts){
            res.status(404).json({'error': 'No Such Post'});
        }

        res.render('homepage', {
            posts: [posts],
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    }

    catch(error) {
        res.status(500).json(error);
    }
});

router.get('/:id/comment', auth, async (req, res) => {
    try {
        let posts = await Post.findByPk(
            req.params.id, {
                include: ['favoriters', User, Tag, {
                    model: Comment,
                    include: User
                }],
            }
        );
        posts = posts.get({plain: true});

        if (!posts){
            res.status(404).json({'error': 'No Such Post'});
        }

        res.render('draftComment', {
            posts: [posts],
            loggedIn: req.session.loggedIn,
            user: req.session.user
        });
    }

    catch(error) {
        res.status(500).json(error);
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        let posts = await Post.findByPk(req.params.id, {
            include: Tag
        });
        posts = posts.get({plain: true});

        res.render('editPost', {
            loggedIn: req.session.loggedIn,
            user: req.session.user,
            posts
        });
    }
        
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
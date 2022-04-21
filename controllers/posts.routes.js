const router = require('express').Router();
const sequelize = require('../config/connection');
const {Comment, Post, User, Tag} = require('../models');

router.get('/top', async (req, res) => {
    
    let user = await User.findByPk(req.session.user.id, {
        include: 'favorites'
    });
    user = user.get({plain: true});
    
    let posts = await Post.findAll({
        include: ['favoriters', User, Tag],
        // can't seem to find a way to include the count of favoriters in the query call...
        // attributes: [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.postId = post.id)'), 'num_favs']
    });
    posts = posts.map(post => post.get({plain: true}));
    posts.sort((post1, post2) => post2.favoriters.length-post1.favoriters.length); //sorts by number of 'favoriters'

    res.status(200).render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        user
    });
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

router.get('/:id/comment', async (req, res) => {
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

module.exports = router;
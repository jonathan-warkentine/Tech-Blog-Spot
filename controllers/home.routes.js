const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Tag} = require('../models');
const auth = require('../utils/auth');



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

router.get('/compose', auth, async (req, res) => {
    res.render('compose', {
        loggedIn: req.session.loggedIn,
        user: req.session.user
    });
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User} = require('../models');


router.get('/:id', async (req, res) => {
    
    try {
        let profileUser = await User.findByPk(req.params.id);
        profileUser = profileUser.get({plain: true});

        let posts = await Post.findAll({
            where: {
                author_id: req.params.id 
            }
        });
        posts = posts.map(post => post.get({plain: true}));

        res.render('profile', {
            posts,
            profileUser,
            user: req.session.user,
            loggedIn: req.session.loggedIn
        });
    }
    catch (error){
        res.status(500).json(error);
    }
});

router.get('/:id/favorites', async (req, res) => {
    
    try {
        let profileUser = await User.findByPk(req.params.id, {
            include: 'favorites'
        });
        profileUser = profileUser.get({plain: true});

        let user = await User.findByPk(req.session.user.id, {
            include: 'favorites'
        });
        user = user.get({plain: true});

        let posts = await Post.findAll({
            where: {
                id: profileUser.favorites.map(fav => fav.id) //generates an array of post ids belonging to the specified user's favorites
            },
            include: 'favoriters'
        });
        posts = posts.map(post => post.get({plain: true}));

        res.render('profile', {
            posts,
            profileUser,
            user,
            loggedIn: req.session.loggedIn
        });
    }
    catch (error){
        res.status(500).json(error);
    }
});

module.exports = router;
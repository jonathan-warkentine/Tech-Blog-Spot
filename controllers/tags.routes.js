const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, Tag} = require('../models');

router.get('/', async (req, res) => {
    try {
        let tags = await Tag.findAll({
            include: Post
        });
        tags = tags.map(tag => tag.get({plain: true}));

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

module.exports = router;
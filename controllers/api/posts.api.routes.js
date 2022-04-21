const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, Post, Favorite} = require('../../models');


router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
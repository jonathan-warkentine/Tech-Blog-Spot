const router = require('express').Router();
const {Comment} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newCmt = await Comment.create({
            ...req.body,
            user_id: req.session.user.id,
            date: new Date(),
        });
        res.status(200).json(newCmt);
    }

    catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
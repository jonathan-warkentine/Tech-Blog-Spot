const router = require('express').Router();
const {User, Post, Favorite, TagPost, Tag} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            author_id: req.session.user.id,
            date: new Date(),
        });

        await req.body.tags.forEach(async tag => { //Checking to see if a tag already exists, creating if not
            const [newTag, created] = await Tag.findOrCreate({
                where: { tagname: tag },
            });

            await TagPost.create({
                post_id: newPost.id,
                tag_id: newTag.id
            });
        });

        res.status(200).json(newPost);
    }

    catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        post.set({
            ...req.body
        });
        post.save();

        await req.body.tags.forEach(async tag => { //Checking to see if a tag already exists, creating if not
            await Tag.findOrCreate({
                where: { tagname: tag },
            });

            await TagPost.findOrCreate({
                where: {
                    post_id: post.id,
                    tag_id: newTag.id
                }
            });

        });

        res.status(200).json(post);
    }

    catch (error) {
        res.status(400).json(error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
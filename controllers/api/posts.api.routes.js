const router = require('express').Router();
const {User, Post, Favorite, TagPost, Tag} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            author_id: req.session.user.id,
            date: new Date(),
        });
        res.status(200).json(newPost);

        await req.body.tags.forEach(async tag => { //Checking to see if a tag already exists, creating if not
            const [newTag, created] = await Tag.findOrCreate({
                where: { tagname: tag },
            });

            await TagPost.create({
                post_id: newPost.id,
                tag_id: newTag.id
            });
        });
    }

    catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
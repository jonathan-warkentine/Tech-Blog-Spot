const router = require('express').Router();
const usersRoutes = require('./users.api.routes');
const postsRoutes = require('./posts.api.routes');
const commentsRoutes = require('./comments.api.routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
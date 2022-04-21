const router = require('express').Router();
const usersRoutes = require('./users.api.routes');
const postsRoutes = require('./posts.api.routes')

router.use('/users', usersRoutes);
router.use('./posts', postsRoutes);

module.exports = router;
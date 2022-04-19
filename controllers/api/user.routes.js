const router = require('express').Router();
const {User, Post, Favorite} = require('../../models');


router.post('/', async (req, res) => {
    
    try {
        const newUsr = await User.create(req.body);
        res.status(200).json(newUsr);
    }
    catch (error) {
        res.status(400).json(error);
    }

});

router.post('/login', async (req, res) => {
    
    try {
        const usr = await User.findOne({where: {email: req.body.email}});
        if (!usr){
            res.status(400).json({'Error': 'Check Your Username and Password and Try Again'})
        }
        // Password
        // Validation
        //

    }
    catch (error) {
        res.status(400).json(error);
    }

});

// router.get('/', async (req, res) => {
//     const allUsers = await User.findAll({
//         include: Post,
//         include: {
//             model: Post,
//             as: 'favorites',
//             // attributes: ["id", "title","content","date","author_id"]
//         }
//     });
//     res.json(allUsers);
// });

module.exports = router;
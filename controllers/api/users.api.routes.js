const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, Post, Favorite} = require('../../models');


router.post('/', async (req, res) => {
    try {
        const newUsr = await User.create(req.body);
        req.session.loggedIn = true;
        req.session.user = newUsr;
        res.status(200).json(newUsr);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const usr = await User.findOne({
            where: {
                email: req.body.email
            },
            include: 'favorites'
        });
        if (!usr){
            res.status(400).json({'Error': 'Check Your Username and Password and Try Again'})
        }
        
        await bcrypt.compare(req.body.password, usr.password)
        .then(match => {
            if (match) {
                req.session.loggedIn = true;
                req.session.user = usr;
                res.sendStatus(200);
            }
            else {
                res.status(400).json({'Error': 'Check Your Username and Password and Try Again'})
            }
        });
    }
    catch (error) {
        res.status(400).json(error);
    }

});

router.put('/favorite/:id', async (req, res) => {
    try {
        let [entry, created] = await Favorite.findOrCreate({
            where: {
                userId: req.session.user.id,
                postId: req.params.id
            }
        });
        
        if (!created){
            await entry.destroy();
            res.status(200).json(entry);
        }
        else {
            res.status(200).json(entry);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});

router.get('/logout', async (req, res) => {
    req.session.loggedIn = false;
    res.status(200).redirect('../../../');
});

module.exports = router;
const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/pets', require('./pets'));

router.use('/veterinarians', require('./veterinarians'));

// #swagger.tags = ['Authentication']
// #swagger.description = 'Directs the user to GitHub OAuth authentication.'
router.get('/login', passport.authenticate('github'), (req, res) => { });

// #swagger.tags = ['Authentication']
// #swagger.description = 'Ends the authenticated session.'
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;
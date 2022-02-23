const express = require('express'),
    router = express.Router(),
    { isEmail } = require('validator'),
    md5 = require('md5');

router.post('/', (req, res) => {
    const { userEmail: email, userPassword: password } = req.body;

    if (email && password) {
        if (isEmail(email)) {
            req.session.token = md5(email);
            res.send({ token: req.session.token });
        } else {
            res.sendStatus(406);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
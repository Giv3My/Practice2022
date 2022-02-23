const session = require('express-session');

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.token)
        res.status(408).send({ error: "Token has been expired" });
    else
        res.send({ token: req.session.token });
});

module.exports = router;
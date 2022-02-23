const session = require('express-session');

const express = require('express'),
    router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy();

    res.sendStatus(200);
})

module.exports = router;
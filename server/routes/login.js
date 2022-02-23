const express = require('express'),
    router = express.Router(),
    { isEmail } = require('validator'),
    md5 = require('md5');

// let token = "";

// const generateToken = (data) => {
//     const { userEmail } = data;

//     return md5(userEmail);
//     // localStorage.setItem("userToken", token);
// }

router.get('/', (req, res) => {
    res.json(token);
});

router.post('/', (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (userEmail && userPassword) {
        if (isEmail(userEmail)) {
            const token = md5(userEmail);
            res.json(token);
        } else {
            res.status(402).send();
        }
    } else {
        res.status(401).send();
    }
});

module.exports = router;

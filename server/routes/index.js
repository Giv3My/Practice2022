const router = require('express').Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/accessToken', authMiddleware, userController.accessToken);
router.get('/refreshToken', userController.refreshToken);

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
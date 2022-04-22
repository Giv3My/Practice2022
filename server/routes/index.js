const router = require('express').Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/accessToken', authMiddleware, userController.accessToken);
router.get('/refreshToken', userController.refreshToken);
router.post('/users', userController.getUsers);

module.exports = router;
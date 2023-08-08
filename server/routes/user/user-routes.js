const userController = require('../../controllers/user/user-controller');
const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');

//Authentication
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refreshToken', userController.newAccessToken);
router.post('/logout', userController.logout);
router.get('/forgotPassword', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);

//CRUD:
// router.post('/register', userController.register);
router.get('/user',verifyAccessToken, userController.getUSer);
router.get('/users',verifyAccessToken, userController.getAllUsers);
router.put('/update/:_id',verifyAccessToken, userController.updateUserById);
router.delete('/delete/:_id',verifyAccessToken, userController.deleteUserById);
router.put('/updateAddress/',verifyAccessToken, userController.updateUserAddress);
router.put('/updateCart', verifyAccessToken, userController.updateUserCart);

module.exports = router;


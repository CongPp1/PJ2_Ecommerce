const router = require('express').Router();
const OAuth2UserController = require('../../controllers/oauth2Controller/oauth2User-controller');
const {verifyAccessToken} = require('../../middlewares/verifyToken');

router.get('/get-one/:oauth2Id', OAuth2UserController.getOauth2User);

module.exports = router;
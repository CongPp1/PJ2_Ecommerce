const { v4: uuidv4 } = require('uuid');
const Oauth2User = require('../../models/oauthUser.js');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const oauth2LoginSuccessController = asyncHandler(async (req, res) => {
    try {
        const newTokenLogin = uuidv4();
        const { oauth2Id, tokenLogin } = req.body;
        if(!oauth2Id || !tokenLogin) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        let [response] = await Promise.all([
            Oauth2User.findOne({ oauth2Id, tokenLogin }).lean().exec(),
            Oauth2User.updateOne({ oauth2Id: oauth2Id }, { tokenLogin: newTokenLogin })
        ]);
        const token = response && jwt.sign({ oauth2Id: response.oauth2Id, email: response.email, role: response.role }, process.env.SECRET_KEY, { expiresIn: '1s' });
        return res.status(200).json({
            message: 'Token created successfully',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getOauth2User = asyncHandler(async (req, res) => {
    try {
        console.log('req.body')
        console.log(req.params.oauth2Id)
        const response = await Oauth2User.findOne({ oauth2Id: req.params.oauth2Id }).lean().exec();
        console.log(response)
        if(!response) {
            return res.status(200).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'Success',
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
        
    }
})

module.exports = {
    oauth2LoginSuccessController,
    getOauth2User
}
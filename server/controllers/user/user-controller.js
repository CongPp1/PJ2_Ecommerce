const User = require('../../models/user.js');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../../middlewares/jwt.js');
const { sendMail } = require('../../utils/sendmail.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'Please provide all fields',
        });
    }
    const isRegister = await User.findOne({ email: email });
    if (isRegister) {
        return res.status(200).json({
            message: 'User already exists',
        });
    }
    const result = await User.create(req.body);
    res.status(201).json({
        message: 'User created successfully',
        result
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide all fields',
        });
    }
    const result = await User.findOne({ email: email });
    if ((result && await result.isCorrectEmail(email) && await result.isCorrectPassword(password))) {
        const accessToken = generateAccessToken(result._id, result.role);
        const refreshToken = generateRefreshToken(result._id);
        await User.findByIdAndUpdate(
            result._id,
            { refreshToken: refreshToken },
            { new: true }, // tra ve data sau khi update
        );
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 1000 });
        return res.status(200).json({
            message: 'User logged in successfully',
            accessToken,
            result
        });
    } else {
        return res.status(401).json({
            message: 'Invalid credentials',
        });
    }
});

const newAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie.refreshToken || !cookie) {
        return res.status(401).json({
            message: 'Please login first',
        });
    }
    jwt.verify(cookie.refreshToken, process.env.SECRET_KEY, async (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({
                message: 'No refresh token in the cookie',
            });
        }
        const result = await User.findOne({
            _id: decode._id,
            refreshToken: cookie.refreshToken
        })
        return res.status(200).json({
            message: 'Token refreshed successfully',
            newAccessToken: generateAccessToken(result._id, result.role)
        })
    })
});

const logout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken && !cookie) {
        return res.status(401).json({
            message: 'Please login first',
        });
    }
    jwt.verify(cookie.refreshToken, process.env.SECRET_KEY, async (error, decode) => {
        if (error) {
            return res.status(401).json({
                message: 'No refresh token in the cookie',
            });
        }
        const result = await User.findOne({
            _id: decode._id,
            refreshToken: cookie.refreshToken
        })
        await User.findByIdAndUpdate(
            result._id,
            { refreshToken: '' },
            { new: true }, // tra ve data sau khi update
        );
        res.clearCookie('refreshToken');
        return res.status(200).json({
            message: 'User logged out successfully',
        })
    })
};

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    try {
        if (!email) {
            return res.status(400).json({
                message: 'Please provide email',
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const resetToken = user.createChangePasswordToken();
        console.log(resetToken);
        await user.save({ validateBeforeSave: false });
        const html = `Xin vui lòng click vào link dưới đây để đổi mật khẩu:
         <a href=${process.env.URL_SERVER}/api/user/resetPassword/${resetToken}>Click Here</a>`;
        const data = {
            email,
            html
        }
        sendMail(data);
        return res.status(200).json({
            message: 'Email sent successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { password, token } = req.body;
        if (!password || !token) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            passwordTokenExpiredIn: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid reset oken',
            });
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.passwordChangedAt = Date.now();
        user.passwordResetTokenExpiredIn = undefined;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getUSer = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;

        const result = await User.findById(_id).select('-password -refreshToken');
        if (!result) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User fetched successfully',
            result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        if (users.length <= 0) {
            return res.status(404).json({
                message: 'Data is empty',
            });
        }
        return res.status(200).json({
            message: 'Users fetched successfully',
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const getUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User fetched successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please provide all fields',
            });
        }
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        return res.status(200).json({
            message: 'User deleted successfully',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserAddress = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        if (!req.body.address) {
            return res.status(404).json({
                message: 'Please enter address'
            });
        }
        const response = await User.findByIdAndUpdate(_id, {
            $push: { addresses: req.body.address }
        }, { new: true });
        return res.status(200).json({
            message: 'Updated address successfully',
            response: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

const updateUserCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { _id: p_id, quantity, color } = req.body;
        if (!p_id || !quantity || !color) {
            return res.status(400).json({
                message: 'Please enter a quantity, a color and p_id'
            });
        }
        const user = await User.findById(_id);
        const alreadyCart = user?.carts?.find((element) => element.product.toString() === p_id);
        if (alreadyCart) {
            if (alreadyCart.color === color) {
                const response = await User.updateOne({ carts: { $elemMatch: alreadyCart } }, { $set: { 'carts.$.quantity': quantity } }, { new: true });
                return res.status(200).json({
                    message: 'Updated quantity',
                    UpdatedUser: response
                });
            }
        } else {
            console.log('aaaaaaa')
            const user = await User.findByIdAndUpdate(_id, {
                $push: { carts: { product: p_id, color, quantity } }
            }, { new: true });
            return res.status(200).json({
                message: 'Updated cart successfully',
                response: user
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
});

module.exports = {
    register,
    login,
    getUSer,
    newAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    updateUserAddress,
    updateUserCart
}
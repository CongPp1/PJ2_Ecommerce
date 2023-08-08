const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    carts: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
    }],
    addresses: {
        type: Array,
        default: []
    },
    wishLists: [
        { type: mongoose.Types.ObjectId, ref: 'Product' },
    ],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    passwordChangedAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordTokenExpiredIn: {
        type: String
    },
    passwordResetTokenExpiredIn: {
        type: String
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified()) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    isCorrectEmail: async function (email) {
        return await this.email === email;
    },
    createChangePasswordToken: async function() {
        const resetPasswordToken = crypto.randomBytes(32).toString('hex'); //he thap luc phan
        this.passwordResetToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
        this.passwordTokenExpiredIn = Date.now() + 15 * 60  * 1000;
        return resetPasswordToken;
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var oauthUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    oauth2Id: {
        type: Number,
    },
    role: {
        type: String,
        default: 'user',
    },
    typeLogin: {
        type: String,
    },
    tokenLogin: {
        type: String,
    },
    avtUrl: {
        type: String,
    },
    carts: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
        price: Number,
        title: String,
        images: Array
    }],
});

/**
 * Finds or creates a user based on the provided filter and defaults.
 *
 * @param {Object} filter - The filter to find the user.
 * @param {Object} defaults - The default values for the new user.
 * @return {Array} An array containing the user object and a boolean indicating if the user is new or not.
 */
oauthUserSchema.statics.findOrCreate = async function (filter, defaults) {
    const user = await this.findOne(filter);
    if (user) {
        return [user, false]; // Người dùng đã tồn tại
    } else {
        const newUser = new this(defaults);
        await newUser.save();
        return [newUser, true]; // Người dùng mới đã được tạo
    }
};

//Export the model
module.exports = mongoose.model('OauthUser', oauthUserSchema);
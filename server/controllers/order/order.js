const Order = require('../../models/order.js');
const User = require('../../models/user.js');
const Coupon = require('../../models/coupon.js');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { coupon } = req.body;
        const includedFields = 'title price';
        const userCart = await User.findById(_id).select('carts').populate('carts.product', includedFields);
        const products = userCart?.carts.map((element) => ({
            product: element.product._id,
            count: element.quantity,
            color: element.color
        }));
        let sumProduct = userCart?.carts?.reduce((sum, element) => sum + (+element.product?.price * +element.quantity), 0);
        const createData = {products, sumProduct, orderBy: _id};
        if (coupon) {
            const selectedCoupon = await Coupon.findById(coupon)
            sumProduct = Math.round(sumProduct * (1 - +selectedCoupon?.discount / 100) / 1000) * 1000;    
            createData.coupon = coupon;
            createData.sumProduct = sumProduct;
        } else {
            sumProduct = sumProduct;
        }
        const response = await Order.create(createData);
        return res.status(200).json({
            message: 'Order created successfully',
            response: response,
            total: sumProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot create order'
        });
    }
});

const updateStatusOrder = asyncHandler(async (req, res) => {
    try {

        const { _id } = req.params;
        const { status } = req.body;
        const orderStatuses = ['pending', 'cancelled', 'success'];
        if(!status || !orderStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Please provide a valid status: "cancelled", "pending", or "success"'
            });
        }
        const response = await Order.findByIdAndUpdate(_id, { status }, { new: true });
        return res.status(200).json({
            message: 'Order updated successfully',
            response: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot create order'
        });
    }
});

const getOrdersOfCurrentUser = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const orders = await Order.find({orderBy: _id});
        return res.status(200).json({
            message: 'Successfully',
            orders: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot get order'
        });
    }
});

const getOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        if(orders.length <= 0) {
            return res.status(404).json({
                message: 'Data is empty'
            });
        }
        return res.status(200).json({
            message: 'Successfully',
            Orders: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Cannot get orders'
        });
    }
});

module.exports = {
    createOrder,
    updateStatusOrder,
    getOrdersOfCurrentUser,
    getOrders
}
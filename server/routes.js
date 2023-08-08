const express = require('express');
const userRoutes = require('./routes/user/user-routes.js');
const productRoutes = require('./routes/product/product-routes.js');
const productCategoryRoutes = require('./routes/product/productCategory-routes.js');
const blogRoutes = require('./routes/blog/blog-routes');
const blogCategoryRoutes = require('./routes/blog/blogCategory-routes.js');
const brandRoutes = require('./routes/brand/brand-routes.js');
const couponRoutes = require('./routes/coupon/coupon-routes.js');
const orderRoutes = require('./routes/order/order-routes.js');
const router = express.Router();


router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/productCategory', productCategoryRoutes);
router.use('/blog', blogRoutes);
router.use('/blogCategory', blogCategoryRoutes);
router.use('/brand', brandRoutes);
router.use('/coupon', couponRoutes);
router.use('/order', orderRoutes);

module.exports = router;
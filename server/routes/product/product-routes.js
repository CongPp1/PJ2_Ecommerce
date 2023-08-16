const productController = require('../../controllers/product/product-controller.js');
const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const uploader = require('../../config/cloundinary-config.js');

router.post('/createProduct', verifyAccessToken, productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:_id', verifyAccessToken, productController.getProductById);
router.put('/updateProduct/:_id', verifyAccessToken, productController.updateProductById);
router.delete('/deleteProduct/:_id', verifyAccessToken, productController.deleteProductById);
router.put('/rating', verifyAccessToken, productController.handleRatings);
router.put('/uploadImage/:_id', verifyAccessToken, uploader.array('images', 10), productController.uploadImage);

module.exports = router;
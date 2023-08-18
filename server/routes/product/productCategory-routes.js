const router = require('express').Router();
const { verifyAccessToken } = require('../../middlewares/verifyToken.js');
const productCategoryController = require('../../controllers/product/productCategory-controller.js');

router.post('/create', verifyAccessToken, productCategoryController.createProductCategory);
router.get('/productCategories', productCategoryController.getProductCategories);
router.get('/productCategory/:_id', productCategoryController.getProductCategoryById);
router.put('/update/:_id', verifyAccessToken, productCategoryController.updateProductCategoryById);
router.delete('/delete/:_id', verifyAccessToken, productCategoryController.deleteProductCategoryById);

module.exports = router;
const Product = require('../../models/product.js');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const product = require('../../models/product.js');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }
        if (req.body && req.body.title) {
            req.body.slug = slugify(req.body.title, {
                lower: true
            });
        }
        const product = await Product.create(req.body);
        return res.status(201).json({
            messagage: 'Create Product successfully',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            messagage: 'Error creating product',
            error: error.message
        });
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        const excludesFields = ['limit', 'sort', 'page', 'fields'];

        // Xóa các trường đặc biệt ra khỏi queries
        for (const field in queries) {
            if (excludesFields.includes(field)) {
                delete queries[field];
            }
        }
        // Format queries
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (matchedElement) => `$${matchedElement}`);
        const formatedStringQuery = JSON.parse(queryString);

        // search
        if (queries?.title) {
            formatedStringQuery.title = { $regex: queries.title, $options: 'i' }; //'i': không phân biệt chữ hoa chữ thường
        }

        //Sort
        if (req.query.sort) {
            let sortOptions = {};
            const sortBy = req.query.sort.split(',').join(' ');//Nếu trong query string có tham số sort, phân tách các trường sắp xếp bằng dấu phẩy và thay thế bằng dấu cách
            sortOptions = sortBy; // Gán giá trị sắp xếp vào đối tượng sortOptions
        }

        //Fields limittings
        if (req.query.fields) {
            console.log("req.query.fields", req.query.fields);
            const fields = req.query.fields.split(',').join(' ');
            let queryCommand = Product.find(formatedStringQuery);
            queryCommand = queryCommand.select(fields);
        }

        //Pagniation
        const page = +req.query.page || 1;
        const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
        const skip = (page - 1) * limit;
        let queryCommand = Product.find(formatedStringQuery);
        // queryCommand.skip(skip.limit(limit));



        // Find and Count documents
        const products = await Product.find(formatedStringQuery);
        const quantity = await Product.countDocuments(formatedStringQuery);

        return res.status(200).json({
            message: 'Get all products successfully',
            data: {
                products,
                quantity,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error getting products',
            error: error.message,
        });
    }
});


const getProductById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({
                messagage: 'Product not found'
            })
        }
        return res.status(200).json({
            messagage: 'Get product successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            messagage: 'Error getting product',
            error: error.message
        });
    }
})

const updateProductById = asyncHandler(async (req, res) => {
    try {
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }
        const { _id } = req.params;
        const product = await Product.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            messagage: 'Update product successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            messagage: 'Error updating product',
            error: error.message
        });
    }
});

const deleteProductById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        await Product.findByIdAndDelete(_id);
        return res.status(200).json({
            messagage: 'Delete product successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            messagage: 'Error deleting product',
            error: error.message
        });
    }
})

const handleRatings = asyncHandler(async (req, res) => {
    try {
        const { _id: _id } = req.user;
        const { star, comment, _id: p_id } = req.body;
        console.log(req.body);
        if (!star || !p_id) {
            return res.status(404).json({
                messagage: 'Missing input'
            });
        };
        const product = await Product.findById(p_id);
        const isRated = product?.ratings?.find((element) => element.postedBy.toString() === _id);
        console.log('isRated: ', isRated);
        if (isRated) {
            //cap nhap so sao va binh luan:
            await Product.updateOne({
                ratings: { $elemMatch: isRated },
            }, {
                $set: { "ratings.$.star": star, "ratings.$.comment": comment }
            }, { new: true });
        } else {
            await Product.findByIdAndUpdate(p_id, {
                $push: {
                    ratings: { star, comment, postedBy: _id }
                }
            }, { new: true });
        }
        const updatedProduct = await Product.findById(p_id);
        const count = updatedProduct.ratings.length;
        const sumRated = updatedProduct.ratings.reduce((sum, element) => sum + +element.star, 0);
        updatedProduct.totalRatings = Math.round(sumRated * 10 / count) / 10;
        await updatedProduct.save();

        return res.status(200).json({
            messagage: "success",
            updatedProduct: updatedProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messagage: 'Error handling ratings request',
            error: error.messagage
        });
    }
});

const uploadImage = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        if (!req.files) {
            return res.status(400).json({
                messagage: 'Please select files first'
            });
        }
        const response = await Product.findByIdAndUpdate(_id, {
            $push: { images: { $each: req.files.map((element) => element.path) } }
        }, { new: true });
        return res.status(200).json({
            messagage: 'Uploading image oke'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messagage: 'Error uploading image',
            error: error.messagage
        });
    }
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    handleRatings,
    uploadImage
}
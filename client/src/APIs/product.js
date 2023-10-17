import axios from "../axios.js";

/**
 * Retrieves a list of products from the API.
 *
 * @param {Object} params - The parameters for the API request.
 * @return {Promise} A promise that resolves with the response data.
 */
export const apiGetProducts = async (params) => {
    return axios({
        url: '/product/products',
        method: 'GET',
        params
    })
};
apiGetProducts()
    .then(response => {
        console.log("API getProducts Response:", response.data);
    })
    .catch(error => {
        console.error("API getProducts Error:", error);
    });

/**
 * Retrieves product data from the API based on the provided ID.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @return {Promise} A Promise that resolves to the product data.
 */
export const apiGetProductById = (id) => {
    return axios({
        url: '/product/products/' + id,
        method: 'GET',
    })
};
apiGetProductById()
    .then(response => {
        console.log("API getProductById Response:", response.data);
    })
    .catch(error => {
        console.error("API getProductById Error:", error);
    });

/**
 * Sends a PUT request to the '/product/rating' endpoint with the provided data.
 *
 * @param {object} data - The data to be sent with the request.
 * @return {Promise} A promise that resolves with the response from the server.
 */
export const apiRating = (data) => {
    return axios({
        url: '/product/rating',
        method: 'PUT',
        data
    });
};
apiRating()
    .then(response => {
        console.log("API Rating Response:", response.data);
    })
    .catch(error => {
        console.error("API Rating Error:", error);
    });


/**
 * Creates a new product using the API.
 *
 * @param {Object} data - The data object containing the product information.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const apiCreateProduct = (data) => {
    return axios({
        url: '/product/createProduct',
        method: 'POST',
        data
    });
}
apiCreateProduct()
    .then(response => {
        console.log("API Create Product Response:", response.data);
    })
    .catch(error => {
        console.error("API Create Product Error:", error);
    })


/**
 * Updates a product in the API.
 *
 * @param {string} productId - The ID of the product to update.
 * @param {object} data - The data to update the product with.
 * @return {Promise} A promise that resolves to the updated product.
 */
export const apiUpdateProduct = (productId, data) => {
    return axios({
        url:'/product/updateProduct/' + productId,
        method: 'PUT',
        data
    });
}
apiUpdateProduct()
    .then(response => {
        console.log("API Update Product Response:", response.data);
    })
    .catch(error => {
        console.log("API Delete Product Response:", error);
    })

/**
 * Deletes a product from the server.
 *
 * @param {number} productId - The ID of the product to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion.
 */
export const apiDeleteProduct = (productId) => {
    return axios({
        url: '/product/deleteProduct/' + productId,
        method: 'DELETE',
    });
}
apiDeleteProduct()
    .then(response => {
        console.log("API Delete Product Response:", response.data);
    })
    .catch(error => {
        console.log("API Delete Product Response:", error);
    })


/**
 * Adds a variant to the product using the API.
 *
 * @param {object} data - The data for the variant.
 * @param {string} id - The ID of the product.
 * @return {Promise} A promise that resolves with the result of the API call.
 */
export const apiAddVariant = (data ,id) => {
    return axios({
        url: '/product/variant/' + id,
        method: 'PUT',
        data
    });
}
apiAddVariant()
    .then(response => {
        console.log("API Add Variant Response:", response.data);
    })
    .catch(error => {
        console.log("API Add Variant Response:", error);
    })


export const apiCreateOrder = (data) => {
    return axios({
        url: '/order/create',
        method: 'POST',
        data
    });
}
apiCreateOrder()
    .then(response => {
        console.log("API Create Order Response:", response.data);
    })
    .catch(error => {
        console.log("API Create Order Error:", error);
    })
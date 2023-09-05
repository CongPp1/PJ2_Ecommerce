import axios from "../axios.js";

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
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
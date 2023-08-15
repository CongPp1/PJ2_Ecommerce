import axios from "../axios.js";

export const apiGetProducts = async () => {
    axios({
        url: '/product/products',
        method: 'GET',
    })
};

apiGetProducts()
    .then(response => {
        console.log("API getProducts Response:", response.data);
    })
    .catch(error => {
        console.error("API getProducts Error:", error);
    });
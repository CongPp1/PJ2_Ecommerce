import axios from "../axios";

export const apiGetCategories = () => {
    console.log("API getCategories");
    return axios({
        url: '/productCategory/productCategories',
        method: 'GET',
    });
}

apiGetCategories()
    .then(response => {
        console.log("API getCategories Response:", response.data);
    })
    .catch(error => {
        console.error("API getCategories Error:", error);
    });
   
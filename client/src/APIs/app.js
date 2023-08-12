import axios from "../axios";

export const apiGetCategories = () => {
    console.log("API getCategories");
    axios({
        url: '/productCategory/productCategories',
        method: 'GET',
    })
}
import axios from "../axios";

export const apiRegister = (data) => {
    return axios({
        url: '/user/register',
        method: 'POST',
        data
    })
}
apiRegister()
    .then(response => {
        console.log("API Register Response:", response.data);
    })
    .catch(error => {
        console.error("API register Error:", error);
    });
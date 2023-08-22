import axios from "../axios";

export const apiRegister = (data) => {
    return axios({
        url: '/user/register',
        method: 'POST',
        data,
        withCredentials: true,
    })
}
apiRegister()
    .then(response => {
        console.log("API Register Response:", response.data);
    })
    .catch(error => {
        console.error("API register Error:", error);
    });

export const apiLogin = (data) => {
    return axios({
        url: '/user/login',
        method: 'POST',
        data
    })
};
apiLogin()
    .then(response => {
        console.log("API login Response:", response.data);
    })
    .catch(error => {
        console.error("API login Error:", error);
    });
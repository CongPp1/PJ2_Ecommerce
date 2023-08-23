import axios from "../axios";

export const apiRegister = (data) => {
    return axios({
        url: '/user/register',
        method: 'POST',
        data: data,
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

export const apiForgotPassword = (data) => {
    return axios({
        url: 'user/forgotPassword',
        method: 'POST',
        data
    })
};
apiForgotPassword()
    .then(response => {
        console.log("API ForgotPassword Response:", response.data);
    })
    .catch(error => {
        console.error("API ForgotPassword Error:", error);
    });

export const apiResetPassword = (data) => {
    return axios({
        url: '/user/resetPassword',
        method: 'PUT',
        data
    })
};
apiResetPassword()
    .then(response => {
        console.log("API Reset Password Response:", response.data);
    })
    .catch(error => {
        console.error("API Reset Password Error:", error);
    });
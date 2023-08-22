import { memo, useCallback, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { apiRegister, apiLogin } from "../../APIs/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path.js";
import { register } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: ''
    });
    const [isRegister, setIsRegister] = useState(false);

    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            mobile: ''
        })
    };

    const loginSuccess = (result) => {
        Swal.fire({
            icon: 'success',
            title: `${isRegister ? 'Ban da dang ky tai khoan thanh cong' : 'Bang da dang nhap thanh cong'}`,
            text: result
        }).then(() => {
            setIsRegister(false)
            resetPayload()
        });
    };

    const loginFail = (result) => {
        Swal.fire({
            icon: 'error',
            title: `${isRegister ? 'Ban da dang ky tai khoan that bai' : 'Ban da dang nhap that bai'}`,
            text: result
        })
    }

    const handleSubmit = useCallback(async () => {
        const { firstName, lastName, mobile, ...data } = payload;
        if (isRegister) {
            try {
                const response = await apiRegister(payload)
                if (response.message === 'User created successfully') {
                    loginSuccess(response.message);
                }
            } catch (error) {
                loginFail(error);
            }
        } else {
            try {
                const response = await apiLogin(data);
                console.log('response', response);
                if (response.message === 'User logged in successfully') {
                    loginSuccess(response.message);
                    dispatch(register({ isLogin: true, token: response.accessToken, userData: response.result }));
                    navigate(`/${path.HOME}`);
                }
            } catch (error) {
                loginFail(error);
            }
        }
    }, [payload]);

    const handleChangeStatus = () => {
        setIsRegister(true);
    }

    return (
        <div className="w-screen h-screen relative">
            <img
                className="w-full absolute object-cover"
                src="https://t4.ftcdn.net/jpg/05/38/29/47/360_F_538294733_Lv5YDW2gZwyl5mRI05lSkfLvKWjf1iEQ.jpg"
                alt="back-ground"
            />
            <div className="absolute flex top-0 bottom-0 right-0 left-0 items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] border shadow-2xl">
                    <h1 className=" text-[28px] text-main mb-8 flex flex-col items-center font-semibold">{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && (
                        <div>
                            <InputField
                                value={payload.firstName}
                                setValue={setPayload}
                                nameKey='firstName'
                            />
                            <InputField
                                value={payload.lastName}
                                setValue={setPayload}
                                nameKey='lastName'
                            />
                            <InputField
                                value={payload.mobile}
                                setValue={setPayload}
                                nameKey='mobile'
                            />
                        </div>
                    )}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                    />

                    <Button
                        name={isRegister ? 'Create account' : 'Login'}
                        handleOnClick={handleSubmit}
                        fw
                    />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span className="text-blue-500 hover:underline cursor-pointer">Forgot your account?</span>
                        )}
                        {!isRegister ? (

                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={handleChangeStatus}
                            >
                                Create your account
                            </span>
                        )
                            :
                            (
                                <span
                                    className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                                    onClick={() => setIsRegister(false)}
                                >
                                    Do you have a account? Please log in.
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Login);
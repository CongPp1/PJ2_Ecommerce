import { memo, useCallback, useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from "../../APIs/user";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../utils/path.js";
import { login } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../utils/helper";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);
    const [code, setCode] = useState('');
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: ''
    });

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
            title: `${isRegister ? 'Ban da dang ky tai khoan thanh cong' : 'Ban da dang nhap thanh cong'}`,
            text: result
        }).then(() => {
            setIsRegister(false)
            setIsVerifiedEmail(false)
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
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        console.log(invalids);
        if (invalids === 0) {
            if (isRegister) {
                try {
                    const response = await apiRegister(payload)
                    console.log(response)
                    if (response.success === true) {
                        setIsVerifiedEmail(true);
                    }
                } catch (error) {
                    loginFail(error);
                }
            } else {
                try {
                    const response = await apiLogin(data);
                    if (response.message === 'User logged in successfully') {
                        loginSuccess(response.message);
                        dispatch(login({ isLogin: true, token: response.accessToken, userData: response.result }));
                        navigate(`/${path.HOME}`);
                    }
                } catch (error) {
                    loginFail(error);
                }
            }
        }
    }, [payload, isRegister]);

    const handleChangeStatus = () => {
        setIsRegister(true);
    }

    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        console.log(response);
        if (response.success === true) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const handleOnChange = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeForgotPasswordStatus = () => {
        setIsForgotPassword(true);
    };

    const handleClickBack = () => {
        setIsForgotPassword(false);
    };

    const handleSetCode = (event) => {
        setCode(event.target.value);
    };

    const finalRegister = async () => {
        const response = await apiFinalRegister(code);
        console.log(response);
        if (response.success === true) {
            loginSuccess(response.message);
        } else {
            loginFail(response.message);
        }
    };

    useEffect(() => {
        resetPayload();
    }, [isRegister]);

    return (
        <div className="w-screen h-screen relative">
            {isVerifiedEmail && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay z-50 flex flex-col items-center justify-center">
                    <div className="bg-white w-[500px] rounded-md p-8">
                        <h4 className="">We have sent a confirmation code to your email. Please check your email and enter your code:</h4>
                        <div className="mt-5">
                            <input
                                type="text"
                                value={code}
                                onChange={handleSetCode}
                                className="p-2 border rounded-md outline-none"
                            />
                            <button type="button" className="px-4 py-2 bg-main font-semibold text-white rounded-md ml-4" onClick={finalRegister}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isForgotPassword && (
                <div className="absolute animate-slide-right top-0 bottom-0 right-0 left-0 bg-overlay flex flex-col items-center py-8 z-50">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Enter your email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
                            placeholder="Example: email@gmail.com"
                            value={email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col mt-4 items-center justify-end w-full">
                        <Button name='Submit' handleOnClick={handleForgotPassword} />
                        <Button name='Back' handleOnClick={handleClickBack} style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2' />
                    </div>
                </div>
            )}
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
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                value={payload.lastName}
                                setValue={setPayload}
                                nameKey='lastName'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                value={payload.mobile}
                                setValue={setPayload}
                                nameKey='mobile'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                    )}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button
                        name={isRegister ? 'Create account' : 'Login'}
                        handleOnClick={handleSubmit}
                        fw
                    />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={handleChangeForgotPasswordStatus}
                            >
                                Forgot your account?
                            </span>
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
                    <Link
                        to={`/${path.HOME}`}
                        className="text-blue-500 hover:underline cursor-pointer w-full flex flex-col items-center justify-center"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default memo(Login);
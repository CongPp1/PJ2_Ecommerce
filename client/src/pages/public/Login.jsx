import { memo, useCallback, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { apiRegister } from "../../APIs/user";
import Swal from "sweetalert2";

const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [isRegister, setIsRegister] = useState(false);

    const loginSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Ban da dang ky tai khoan thanh cong',
        })
    };

    const loginFail = () => {
        Swal.fire({
            icon: 'error',
            title: 'Ban da dang ky tai khoan that bai',
        })
    }

    const handleSubmit = useCallback(async () => {
        const { firstName, lastName, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload)
            if (response.message === 'User created successfully') {
                console.log('User created successfully')
                loginSuccess();
            } else {
                loginFail()
            }
        } else {
            
            console.log('data', data);
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
import React, { memo, useState } from 'react';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../APIs/user';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();

    const handleOnChange = (event) => {
        setPassword(event.target.value);
    };

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ token, password });
        console.log(response);
        if (response.success === true) {
            toast.success(response.message);
        }
    };

    return (
        <div className="absolute animate-slide-right top-0 bottom-0 right-0 left-0 bg-overlay flex flex-col items-center py-8 z-50">
            <div className="flex flex-col gap-4">
                <label htmlFor="email">Enter your new password</label>
                <input
                    type="text"
                    id="password"
                    className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
                    placeholder="New password"
                    value={password}
                    onChange={handleOnChange}
                />
            </div>
            <div className="flex flex-col mt-4 items-center justify-end w-full">
                <Button name='Submit' handleOnClick={handleResetPassword} />
            </div>
        </div>
    );
};

export default memo(ResetPassword);
import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import { getOauth2User } from '../../store/asyncOauth2Action';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { logout } from '../../store/oauth2Reducer';

const Oauth2TopHeader = () => {
    const { AiOutlineLogout } = icons;
    const dispatch = useDispatch();
    const { isOauth2Login, oauth2Current } = useSelector(state => state.oauth2Reducer);
    console.log(isOauth2Login)

    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            if (isOauth2Login) {
                dispatch(getOauth2User());
            }
        }, 300);
        return () => {
            clearTimeout(setTimeOutId);
        }
    }, [dispatch, isOauth2Login]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='h-[50px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex items-center justify-between text-xs text-white'>
                <span>ORDER ONLINE OR CALL US 0772244726 </span>
                {isOauth2Login ? (
                    <span className='flex gap-3'>
                        <AiOutlineLogout
                            className='cursor-pointer mt-0.5 hover:rounded-full hover:text-main bg-gray-200 p-2'
                            size={18}
                            onClick={handleLogout}
                        />
                        <span>{`Welcome, ${oauth2Current?.name}`}</span>
                    </span>
                ) : (
                    <Link
                        to={`/${path.LOGIN}`}
                        className='hover:text-gray-800'
                    >
                        Sign in or create account
                    </Link>
                )}
            </div>
        </div>
    );
};

export default memo(Oauth2TopHeader);
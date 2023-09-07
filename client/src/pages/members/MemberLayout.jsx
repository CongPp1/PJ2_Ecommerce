import React, { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';

const MemberLayout = () => {
    const { isLogin, current } = useSelector(state => state.userReducer);
    if (!isLogin || !current) {
        return <Navigate to={path.LOGIN} replace={true} />;
    }

    return (
        <div>
            MemberLayout
            <Outlet/>
        </div>
    );
};

export default memo(MemberLayout);
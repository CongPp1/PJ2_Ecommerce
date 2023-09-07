import React, { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
    const { isLogin, current } = useSelector(state => state.userReducer);
    if (!isLogin || !current || current.role !== 'admin') {
        return <Navigate to={path.LOGIN} replace={true} />;
    }


    return (
        <div>
            AdminLayout
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default memo(AdminLayout);
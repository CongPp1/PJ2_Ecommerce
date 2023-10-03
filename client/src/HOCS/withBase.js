import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const withBase = (Component) => (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div>
            <Component {...props} navigate={navigate} dispatch={dispatch} location={location}/>
        </div>
    );
};

export default memo(withBase);
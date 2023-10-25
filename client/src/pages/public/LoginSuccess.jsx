import React, { memo, useEffect } from 'react';
import withBase from '../../HOCS/withBase';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { oauth2Login, getOauth2User } from '../../store/asyncOauth2Action';

const LoginSuccess = ({ dispatch }) => {
    const { oauth2Id, tokenLogin } = useParams();
    const { isOauth2Login, oauth2Current } = useSelector(state => state.oauth2Reducer);
    console.log(oauth2Current)

    useEffect(() => {
        dispatch(oauth2Login({ oauth2Id, tokenLogin }));
        dispatch(getOauth2User(oauth2Id));
    }, []);

    return (
        <div>
            {isOauth2Login ? <Navigate to={'/'} replace={true} /> : <h3>Yeu cau dang nhap</h3>}
        </div>
    );
};

export default withBase(memo(LoginSuccess));
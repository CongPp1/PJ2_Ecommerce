import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
    const { pid, title } = useParams;
    console.log('DetailProduct', pid, title);

    return (
        <div>
            Detail
        </div>
    );
};

export default memo(DetailProduct);
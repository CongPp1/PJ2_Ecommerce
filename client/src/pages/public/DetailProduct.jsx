import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductById } from '../../APIs/product';
import BreadCrumb from '../../components/BreadCrumb';

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);

    const fetchedProductById = async () => {
        const response = await apiGetProductById(pid);
        console.log('DetailProduct', response.data)
        if (response.message === 'Get product successfully') {
            setProduct(response.data);
        }
    }

    useEffect(() => {
        if (pid) {
            fetchedProductById();
        }
    }, [pid]);

    console.log(product)

    return (
        <div className='w-full '>
            <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
                <div className='w-main'>
                    <h3>{title.toUpperCase()}</h3>
                    <BreadCrumb title={title} category={category} />
                </div>
            </div>
        </div>
    );
};

export default memo(DetailProduct);
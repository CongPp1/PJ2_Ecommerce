import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductById } from '../../APIs/product';
import BreadCrumb from '../../components/BreadCrumb';
import Slider from 'react-slick';

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchedProductById = async () => {
        const response = await apiGetProductById(pid);
        console.log('DetailProduct', response.data)
        if (response.message === 'Get product successfully') {
            setProduct(response.data);
        }
    };

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
            <div className='w-main m-auto mt-4 flex'>
                <div className='border border-blue flex-4 flex flex-col gap-4'>
                    <img src={product?.images[0]} alt="abc" className='h-[458px] w-[458px] border object-cover'/>
                    <div className='w-full'>
                        <Slider {...settings}>
                            {product?.images?.map((element, index) => (
                                <img src={element} alt="abc" className='h-[143px] w-[143px] border object-cover' />
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='border border-red flex-4'>
                    asdmaksddmfk
                </div>
                <div className='border border-green flex-2'>
                    sdkmfksdf
                </div>
            </div>
            <div className='h-[500px]'></div>
        </div>
    );
};

export default memo(DetailProduct);
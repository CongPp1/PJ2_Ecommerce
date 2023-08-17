import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../APIs/product';
import Slider from "react-slick";
import Product from './Product';

const NewArrvals = () => {
    const [newArrivals, setNewArrivals] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchNewArrvals = async () => {
        const response = await apiGetProducts({ sort: 'createdAt' })
        const newArrvalsArr = response.data.products.slice(0,5);
        setNewArrivals(newArrvalsArr);
    }
    useEffect(() => {
        fetchNewArrvals();
    },[]);
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 mt-4 border-main'>NEW ARRIVALS</h3>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {newArrivals?.map((element, index) => (
                        <Product key={index} productData={element}/>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default NewArrvals;
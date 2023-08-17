import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../APIs/product';
import Slider from "react-slick";
import Product from './Product';

const NewArrvals = () => {
    const [newArrivals, setNewArrivals] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, name: 'Smart phone' },
        { id: 2, name: 'Tablet' },
        { id: 3, name: 'Laptop' }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const fetchNewArrvals = async () => {
        const response = await apiGetProducts({ sort: 'createdAt' })
        const newArrvalsArr = response.data.products.slice(0, 5);
        setNewArrivals(newArrvalsArr);
    }
    useEffect(() => {
        fetchNewArrvals();
    }, []);
    return (
        <div className='w-full'>
            <div className='flex justify-between border-b-2 mt-4 border-main'>
                <h3 className='text-[20px] font-semibold py-[15px] '>NEW ARRIVALS</h3>
                <div className='items-end flex gap-10 px-6 mb-4 mr-[-20px]'>
                    {tabs.map((element, index) => (
                        <span
                            key={index}
                            onClick={() => setActiveTab(element.id)}
                            className={`cursor-pointer ${activeTab === element.id ? 'text-red-600' : 'text-gray-400'}`}
                        >
                            {element.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-4 mx-[-10px]">
                <Slider {...settings}>
                    {newArrivals?.map((element, index) => (
                        <Product key={index} productData={element} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default NewArrvals;
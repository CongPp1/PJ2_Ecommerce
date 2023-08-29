import React, { memo, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import Product from '../../components/Product';
import { apiGetProducts } from '../../APIs/product';
import Masonry from 'react-masonry-css'
import SearchItem from '../../components/SearchItem';

const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState(null);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const fetchedProducts = async (query) => {
        const response = await apiGetProducts(query);
        if (response.message === 'Get all products successfully') {
            setProducts(response?.data?.products?.map(product => product));
        }
    };

    useEffect(() => {
        fetchedProducts();
    }, []);

    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
                <div className='w-main'>
                    <h3 className='font-extrabold text-[20px]'>{category.toUpperCase()}</h3>
                    <BreadCrumb category={category} />
                </div>
            </div>
            <div className='w-main border p-4 flex justify-between items-center mt-8'>
                <div className='w-4/5 flex-auto flex items-center gap-4'>
                    <SearchItem
                        name='Price'
                    />
                    <SearchItem
                        name='Color'
                    />
                </div>
                <div className='w-1/5 '>
                    Sort
                </div>
            </div>
            <div className='w-main m-auto mt-8'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {/* array of JSX items */}
                    {products?.map((element, index) => (
                        <Product key={index} productData={element} />
                    ))}
                </Masonry>
            </div>
            <div className='h-[100px]'></div>
        </div>
    );
};

export default memo(Products);
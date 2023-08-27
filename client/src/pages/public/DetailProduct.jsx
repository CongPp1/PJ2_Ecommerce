import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductById } from '../../APIs/product';
import BreadCrumb from '../../components/BreadCrumb';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStars } from '../../utils/helper';
import Button from '../../components/Button.jsx';
import SelectQuantity from '../../components/SelectQuantity';
import ProductExtraInfo from '../../components/ProductExtraInfo';
import { productExtraInfos } from '../../utils/constants.js';
import ProductInfomation from '../../components/ProductInfomation';

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

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

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return;
        } else {
            setQuantity(number);
        }
    }, [quantity]);

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) {
            return;
        }
        if (flag === 'minus') {
            setQuantity((prev) => +prev - 1);
        }
        if (flag === 'plus') {
            setQuantity((prev) => +prev + 1);
        }
    }, [quantity]);

    return (
        <div className='w-full '>
            <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
                <div className='w-main'>
                    <h3 className='font-extrabold text-[20px]'>{title.toUpperCase()}</h3>
                    <BreadCrumb title={title} category={category} />
                </div>
            </div>
            <div className='w-main m-auto mt-4 flex'>
                <div className='border border-blue flex-4 flex flex-col gap-4'>
                    <div>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: product?.images[0]
                            },
                            largeImage: {
                                src: product?.images[0],
                                width: 1200,
                                height: 1800
                            }
                        }} />
                    </div>
                    <div className='w-full'>
                        <Slider {...settings}>
                            {product?.images?.map((element, index) => (
                                <div key={index} className='flex w-full gap-3'>
                                    <img src={element} alt="abc" className='h-[143px] w-[143px] border object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className=' flex-4'>
                    <div className='ml-5 mr-5 flex flex-col'>
                        <div className='flex justify-between'>
                            <h2 className='text-[30px] font-semibold'>{`${formatPrice(product?.price)} VND`}</h2>
                            <span className='text-sm text-main mt-3 mr-3'>{`Kho: ${product?.quantity}`}</span>
                        </div>
                        <div className='flex mt-4 gap-2'>
                            {renderStars(product?.totalRatings)}
                            <span className='text-sm text-main italic'>{`(Da ban: ${product?.sold})`}</span>
                        </div>
                        <ul className='list-item list-square mt-4 text-gray-500'>
                            {product?.description?.map((element, index) => (
                                <li key={index} className='leading-8'>{element}</li>
                            ))}
                        </ul>
                        <div className='text-sm flex flex-col gap-8 mt-4'>
                            <div className='flex items-center gap-4'>
                                <span className='font-semibold'>Quantity</span>
                                <SelectQuantity
                                    quantity={quantity}
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                />
                            </div>
                            <Button fw>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='ml-5 flex-2'>
                    {productExtraInfos?.map((element, index) => (
                        <ProductExtraInfo
                            key={index}
                            title={element.title}
                            icon={element.icon}
                            sub={element.sub}
                        />
                    ))}
                </div>
            </div>
            <div className='w-main m-auto mt-6'>
                <ProductInfomation />
            </div>
            <div className='w-full'>
                <div className='flex justify-between border-b-2 mt-4 border-main'>
                    <h3 className='text-[20px] font-semibold py-[15px]'>OTHER CUSTOMERS ALSO BUY:</h3>
                </div>
            </div>
            <div className='h-[500px]'></div>
        </div>
    );
};

export default memo(DetailProduct);
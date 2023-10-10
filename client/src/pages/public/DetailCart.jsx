import React, { memo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../components/Common/BreadCrumb';
import { formatPrice } from '../../utils/helper';
import SelectQuantity from '../../components/Common/SelectQuantity';
import Button from '../../components/Button/Button';
import icons from '../../utils/icons';

const DetailCart = ({ location }) => {
    const { BsArrowRight } = icons;
    const { current } = useSelector(state => state.userReducer);
    const [quantity, setQuantity] = useState(0);

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
        <div className='w-full'>
            <div className='h-[81px] flex items-center justify-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>My Cart</h3>
                    <BreadCrumb category={location?.pathname} />
                </div>
            </div>
            <div className='flex flex-col border-l border-r border-b mt-8 w-main mx-auto'>
                <div className='font-bold bg-main text-white py-3 grid grid-cols-10'>
                    <span className='col-span-6 w-full text-center'>Products</span>
                    <span className='col-span-3 w-full text-center'>Quantity</span>
                    <span className='col-span-1 w-full text-center'>Total</span>
                </div>
                {current?.carts?.map((element, index) => (
                    <div key={index} className={index === current?.carts?.length - 1 ? ' font-bold my-8 py-3 grid grid-cols-10' : 'font-bold border-b my-8 py-3 grid grid-cols-10'}>
                        <span className='col-span-6 w-full text-center'>
                            <div className='flex gap-2'>
                                <img src={element.product.images[0]} alt="iamges" className='w-28 h-28 object-cover' />
                                <div className='flex flex-col justify-start gap-1'>
                                    <span className='text-sm text-main'>{element.product.title}</span>
                                    <span className='text-[10px]'>{element.color}</span>
                                    <span className='text-base'>{element.quantity} x {formatPrice(element.product.price)} VND</span>
                                </div>
                            </div>
                        </span>
                        <span className='col-span-3 w-full text-center'>
                            <div className='flex items-center h-full'>
                                <SelectQuantity 
                                    quantity={quantity}
                                    handleQuantity={handleQuantity}
                                    handleChangeQuantity={handleChangeQuantity}
                                />
                            </div>
                        </span>
                        <span className='col-span-1 w-full text-center'>
                            <span className='text-lg h-full flex items-center justify-center'>{formatPrice(element.product.price * element.quantity) + ' VND'}</span>
                        </span>
                    </div>
                ))}
            </div>
            <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mt-8'>
                <span className='flex gap-40'>
                    <span className='text-gray-500'>Subtotal: </span>
                    <span className='flex flex-col font-bold text-lg'>
                        <span>{formatPrice(current?.carts.reduce((sum, element) => sum + Number(element.product.price), 0))}</span>
                        <span className='flex justify-end'>VND</span>
                    </span>
                </span>
                <span className='text-sm italic text-gray-500'>Shipping, taxes, and discounts calculated at checkout</span>
                <div className='flex gap-5'>
                    <Button
                        name={'Update Cart'}
                        type='submit'
                        style={'p-2 px-2 w-150 text-white bg-black hover:bg-main mt-6 rounded-md'}
                    />
                    <Button
                        name={<div className='flex gap-2 justify-center items-center'>CHECK OUT<BsArrowRight /></div>}
                        type='submit'
                        style={'p-2 px-2 w-150 text-white bg-main hover:bg-black mt-6 rounded-md'}
                    />
                </div>
            </div>
            <div className='h-[100px]'></div>
        </div>
    );
};

export default memo(DetailCart);
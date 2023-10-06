import React, { memo } from 'react';
import icons from '../../utils/icons';
import withBase from '../../HOCS/withBase';
import { showCart } from '../../store/appReducer';
import { useSelector } from 'react-redux';

const Cart = ({ dispatch }) => {
    const { AiFillCloseCircle } = icons
    const { current } = useSelector(state => state.userReducer);
    console.log(current)

    const handleCloseCart = () => {
        dispatch(showCart());
    };

    return (
        <div className='w-[400px] h-screen bg-black grid-rows-10 text-white p-8'>
            <header className='row-span-1 h-full border-b border-gray-500 flex justify-between items-center text-2xl font-bold'>
                <span>Your Cart</span>
                <span className='cursor-pointer p-2' onClick={handleCloseCart}><AiFillCloseCircle size={24} /></span>
            </header>
            <section className='row-span-6 h-full'>
                Content product
                {!current?.carts && (
                    <span className='text-xs italic'>Your cart is empty</span>
                )}
                {current?.carts.map((element, index) => (
                    <div key={index} className=''>
                        {element.product}
                    </div>
                ))}
            </section>
            <div className='row-span-3 h-full'>
                Checkout
            </div>
        </div>
    );
};

export default withBase(memo(Cart));
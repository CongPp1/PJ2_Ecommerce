import React, { memo } from 'react';


const Footer = () => {
    return (
        <div className='w-full flex flex-col'>
            <div className='h-24 bg-main items-center justify-center'>
                <div className=' text-white items-center justify-between'>
                    <div className='flex flex-col'>
                        <span>SIGN UP TO NEWLETTER</span>
                        <small>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <input type='text' name='' id=''/>
                </div>
            </div>
                <div className='bg-gray-700 text-white h-72'>
                    Footer
                </div>
        </div>
    );
};

export default memo(Footer);  
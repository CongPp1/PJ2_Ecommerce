import React, { memo } from 'react';


const Footer = () => {
    return (
        <div className='w-full flex flex-col'>
            <div className='h-24 w-full bg-main items-center justify-center'>
                <div className='flex text-white items-center justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-[20px] text-gray-100'>SIGN UP TO NEWLETTER</span>
                        <small className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <input
                        type='text'
                        name=''
                        id=''
                        className='text-white p-2 rounded-l-main rounded-r-main flex-1 bg-[#F04646] outline-none placeholder:text-sm placeholder: text-gray-100'
                        placeholder='Email address'
                    />
                </div>
            </div>
            <div className='bg-gray-700 text-white h-72'>
                Footer
            </div>
        </div>
    );
};

export default memo(Footer);  
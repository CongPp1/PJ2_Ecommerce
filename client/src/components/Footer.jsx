import React, { memo } from 'react';


const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[103px] bg-main flex items-center justify-center w-main'>
                <div className='w-main text-white items-center justify-between'>
                    <div className='flex flex-col'>
                        <span>SIGN UP TO NEWLETTER</span>
                        <small>Subscribe now and receive weekly newslettert</small>
                    </div>
                    <input type='text' name='' id=''/>
                </div>
                <div className='h-[407px] bg-gray-700 text-white'>
                    Footer
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);  
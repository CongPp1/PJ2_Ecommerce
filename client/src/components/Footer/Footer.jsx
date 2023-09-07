import React, { memo } from 'react';
import icons from '../../utils/icons';


const Footer = () => {
    const { CiLocationOn, MdEmail, AiOutlinePhone } = icons;

    return (
        <div className='w-full flex flex-col'>
            <div className='h-24 w-full flex bg-main items-center justify-center'>
                <div className='flex w-main text-white items-center justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-[20px] text-gray-100'>SIGN UP TO NEWLETTER</span>
                        <small className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <input
                        type='text'
                        name=''
                        id=''
                        className='p-2 w-[500px] rounded-l-main rounded-xl bg-[#F04646] outline-none placeholder:text-sm placeholder: text-gray-200'
                        placeholder='Email address'
                    />
                </div>
            </div>
            <div className='bg-gray-900 text-white h-72 text-[13px] flex w-full justify-center items-center'>
                <div className='flex flex-col'>
                    <div className='w-main flex'>
                        <div className='flex-2 flex flex-col'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
                            <span className='flex gap-2 pt-1'>
                                <CiLocationOn />
                                <span> Address: </span>
                                <span className='opacity-50'> 2b/143, Nguyen Chinh street, Hoang Mai district, Ha Noi city</span>
                            </span>
                            <span className='flex gap-2 pt-1'>
                                <AiOutlinePhone />
                                <span>Phone: </span>
                                <span className='opacity-50'>0772244726</span>
                            </span>
                            <span className='flex gap-2 pt-1'>
                                <MdEmail />
                                <span>Mail: </span>
                                <span className='opacity-50'>trancongdev1512@gmail.com</span>
                            </span>
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>INFOMATION</h3>
                            <span className='opacity-50'>Typography </span>
                            <span className='opacity-50'>Gallery</span>
                            <span className='opacity-50'>Store Location</span>
                            <span className='opacity-50'>Today's Deals</span>
                            <span className='opacity-50'>Contact</span>
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>WHO WE ARE</h3>
                            <span className='opacity-50'>Help </span>
                            <span className='opacity-50'>Free Shipping</span>
                            <span className='opacity-50'>FAQs</span>
                            <span className='opacity-50'>Return & Exchange</span>
                            <span className='opacity-50'>Testimonials</span>
                        </div>
                        <div className='flex-1'>
                            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#DIGITALWORLDSTORE</h3>
                        </div>
                    </div>
                    <div class="container mx-auto flex justify-center mt-8   items-center">
                        <p>&copy; 2023, Digital World 2 Powered by Cong Dep Trai</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);  
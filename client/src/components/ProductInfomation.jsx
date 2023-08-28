import React, { memo, useState } from 'react';
import { tabs } from '../utils/constants';

const ProductInfomation = () => {
    const activeStyle = '';
    const notActiveStyle = '';

    const [activeTab, setActiveTab] = useState(1);

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {tabs?.map((element, index) => (
                    <span
                        key={index}
                        className={`py-2 px-4 cursor-pointer ${activeTab === +element.id ? 'bg-white border border-b-0' : ' bg-gray-200'}`}
                        onClick={() => setActiveTab(element.id)}
                    >
                        {element.title}
                    </span>
                ))}
            </div>
            <div className='w-full border'>
                <span className=' font-semibold'>
                    {tabs?.some((element) => element.id === activeTab) && tabs?.find((element) => element.id === activeTab)?.content.toUpperCase()}
                </span>
                <p className='mt-4'>
                    {tabs?.some((element) => element.id === activeTab) && tabs?.find((element) => element.id === activeTab)?.paragraph}
                </p>
            </div>
        </div>
    );
};

export default memo(ProductInfomation);
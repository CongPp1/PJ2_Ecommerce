import React, { memo } from 'react';
import icons from '../utils/icons';

const SearchItem = ({ name }) => {
    const { AiOutlineDown } = icons;

    return (
        <div className='p-4 gap-2 text-sm cursor-pointer relative border border-gray-800 flex justify-between items-center'>
            <span>{name}</span>
            <AiOutlineDown className='mt-0.5'/>
        </div>
    );
};

export default memo(SearchItem);
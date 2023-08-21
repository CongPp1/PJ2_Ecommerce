import React, { memo } from 'react';

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter, fw }) => {
    return (
        <button
            className={style ? style : `h-[40px] px4 py2 rounded-md my-4 flex flex-col items-center text-white bg-main font-semibold ${fw ? 'w-full' : 'w-fit'}`}
            type='button'
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {iconBefore}
            <span className='mt-2'>{name}</span>
            {iconAfter}
        </button>
    );
};

export default memo(Button);
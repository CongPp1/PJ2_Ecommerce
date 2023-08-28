import React, { memo } from 'react';

const Button = ({ children, handleOnClick, style, iconBefore, iconAfter, fw }) => {
    return (
        <button
            className={style ? style : `h-[40px] px4 py2 rounded-md my-4 flex flex-col items-center text-white bg-main font-semibold ${fw ? 'w-full' : 'w-fit'}`}
            type='button'
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    );
};

export default memo(Button);
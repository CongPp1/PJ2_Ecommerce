import React, { memo, useState } from 'react';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields }) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleOnChange = (event) => {
        setValue((prev) => ({ ...prev, [nameKey]: event.target.vlue }))
    };

    return (
        <div className='w-full relative'>
            {value?.trim() !== '' && (
                <label
                    className='text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm'
                    htmlFor={nameKey}
                >
                    {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                </label>
            )}
            <input
                type={type || 'text'}
                className='px-4 py-2 rounded-sm w-full border my-2 outline-none'
                placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
};

export default memo(InputField);
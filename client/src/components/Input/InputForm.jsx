import React, { memo } from 'react';
import clsx from 'clsx';

const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placeholder, fw, defautlValue }) => {
    return (
        <div className='flex flex-col h-[78px] gap-2'>
            {label && (
                <label htmlFor={id}></label>
            )}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-input', fw && 'w-full')}
                defaultValue={defautlValue}
            />
            {errors[id] && (
                <small className='text-red-500 text-xs'>{errors[id].message}</small>
            )}
        </div>
    );
};

export default memo(InputForm);
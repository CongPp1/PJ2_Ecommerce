import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';

/**
 * Render a form component for inputting data.
 *
 * @param {function} handleUpdate - The function to handle form submission.
 * @return {JSX.Element} The form component.
 */
const InputForm = ({ handleUpdate, defaultValue }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className='flex gap-4 items-center justify-between'>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <label htmlFor="">Email Address</label>
                            <input
                                type="text"
                                defaultValue={defaultValue}
                                {...register('email', { required: true, pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, })}
                            />
                            {errors.email && (
                                <small className="error-container text-main">Email is not valid</small>
                            )}
                            {console.log('defaultValueInput', defaultValue)}
                        </div>
                        <div>
                            <label htmlFor="">First Name</label>
                            <input
                                type="text"
                                defaultValue={defaultValue}
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <small className="error-container text-main">Name is required</small>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <label htmlFor="">Last Name</label>
                            <input
                                type="text"
                                defaultValue={defaultValue}
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <small className="error-container text-main">Name is required</small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="">Mobile</label>
                            <input
                                type="text"
                                defaultValue={defaultValue}
                                {...register("name", { required: true, pattern: /^[0-9]+$/ })}
                            />
                            {errors.name && (
                                <small className="error-container text-main">Number phone is not valid</small>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 mt-5 items-center justify-center'>
                    <Button name={'Submit'} type='submit' style={'p-1 px-2 text-white bg-main hover:bg-red-400 rounded-md '} />
                    <Button name={'Back'} style={'p-1 px-4 text-white bg-main hover:bg-red-400 rounded-md '} />
                </div>
            </form>
        </div>
    )
};

export default memo(InputForm);
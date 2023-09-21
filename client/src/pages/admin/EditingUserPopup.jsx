import React, { memo, useEffect } from 'react';
import { useRef } from 'react'; 
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';


/**
 * Renders a popup for editing a user.
 *
 * @param {Object} data - The user data to be edited.
 * @param {function} handleUpdate - The function to handle the update of the user data.
 * @return {JSX.Element} The JSX element representing the editing user popup.
 */
const EditingUserPopup = ({ data, handleUpdate }) => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const modalRef = useRef();
    console.log(data)

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    }

    const onSubmit = (formData) => {
        handleUpdate(data._id, formData);
    }

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    return (
        <div onClick={handleStopPropagation} ref={modalRef} className='w-[700px] h-[400px] rounded-2xl bg-white p-4 flex flex-col gap-4 items-center justify-center'>
            <h2 className='text-center text-medium text-lg font-semibold'>Editing User</h2>
            <div className='flex gap-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className='flex flex-col gap-8'>
                            <div>
                                <label htmlFor="">Email Address</label>
                                <input
                                    type="text"
                                    defaultValue={data.email}
                                    {...register('email', { required: true, pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, })}
                                />
                                {errors.email && (
                                    <small className="error-container text-main">Email is not valid</small>
                                )}
                            </div>
                            <div>
                                <label htmlFor="">First Name</label>
                                <input
                                    type="text"
                                    defaultValue={data.firstName}
                                    {...register("firstName", { required: true })}
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
                                    defaultValue={data.lastName}
                                    {...register("lastName", { required: true })}
                                />
                                {errors.name && (
                                    <small className="error-container text-main">Name is required</small>
                                )}
                            </div>
                            <div>
                                <label htmlFor="">Mobile</label>
                                <input
                                    type="text"
                                    defaultValue={data.mobile}
                                    {...register("mobile", { required: true, pattern: /^[0-9]+$/ })}
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
        </div>
    );
};

export default memo(EditingUserPopup);
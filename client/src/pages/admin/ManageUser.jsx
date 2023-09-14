import React, { memo, useEffect, useState } from 'react';
import { apiGetAllUsers } from '../../APIs/user';
import moment from 'moment';
import InputField from '../../components/Input/InputField';
import useDebounce from '../../custom-hooks/useDebounce';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { apiDeleteUser, apiUpdateUser } from '../../APIs/user';
import Swal from 'sweetalert2';
import Select from '../../components/Input/Select';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/appReducer';
import EditingUserPopup from './EditingUserPopup';

/**
 * ManageUser component.
 *
 * @return {JSX.Element} Returns a JSX element.
 */
const ManageUser = () => {
    const [users, setUsers] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [queries, setQueries] = useState({
        q: ''
    });
    // const [element, setElement] = useState(null);
    const [editElement, setEditElement] = useState(null);
    const queriesDebounce = useDebounce(queries.q, 800);
    const [params] = useSearchParams();
    const dispatch = useDispatch();

    const fetchedUsers = async (params) => {
        const response = await apiGetAllUsers({ ...params, limit: 10 });
        if (response.message === 'Get all users successfully') {
            setUsers(response.data.users);
            setQuantity(response.data.quantity);
        } else {
            return;
        }
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) {
            queries.q = queriesDebounce;
        }
        fetchedUsers(queries);
    }, [queriesDebounce, params]);

    const handleUpdate = async () => {
        // const response = await apiUpdateUser(data, editElement._id);
        console.log('abc');
    };

    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: 'Bạn có đồng ý xóa người dùng này không?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            denyButtonText: `Không`,
        });

        if (result.isConfirmed) {
            try {
                await apiDeleteUser(userId);
                await Swal.fire('Xóa thành công!', '', 'success');
            } catch (error) {
                Swal.fire('Xóa thất bại!', `${error}`, 'error');
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
        }
    };

    const handlePopupEditingUser = (element) => {
        setEditElement(element);
        dispatch(showModal({
            isShowModal: true,
            modalChildren: <EditingUserPopup handleUpdate={handleUpdate} />
        }))
    };

    console.log('editElement', editElement)

    return (
        <div className='w-full pl-4 pr-4'>
            <h1 className='h-[75px] justify-between items-center text-3xl font-bold px-4'>
                <span>Manage User</span>
            </h1>
            <div className='w-full py-4'>
                <div className='flex justify-end py-4 w-[500px]'>
                    <InputField placeholder='Search by user name or email address...' value={queries.q} setValue={setQueries} nameKey={'q'} />
                </div>
                <table className='table-auto mb-6 text-left w-full'>
                    <thead className='font-bold bg-gray-700 text-[18px] border border-gray-500 text-white'>
                        <tr>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Email address</th>
                            <th className='px-4 py-2'>First name</th>
                            <th className='px-4 py-2'>Last name</th>
                            <th className='px-4 py-2'>Role</th>
                            <th className='px-4 py-2'>Mobile</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Created At</th>
                            <th className='px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users?.map((element, index) => (
                            <tr key={index} className='border border-gray-500'>
                                <td className='py-2 px-4'>{index + 1}</td>
                                <td className='py-2 px-4 flex items-center'>{<span>{element.email}</span>}</td>
                                <td className='py-2 px-4'>{<span>{element.firstName}</span>}</td>
                                <td className='py-2 px-4'>{<span>{element.lastName}</span>}</td>
                                <td className='py-2 px-4'>{<span>{element.role}</span>}</td>
                                <td className='py-2 px-4'>{<span>{element.mobile}</span>}</td>
                                <td className='py-2 px-4'>{<span>{element.isBlocked ? 'Blocked' : 'Active'}</span>}</td>
                                <td className='py-2 px-4'>{moment(element.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='py-2 px-4'>
                                    {console.log(element)}
                                    <span
                                        onClick={() => handlePopupEditingUser(element)}
                                        className='px-2 text-orange-600 cursor-pointer hover:underline'
                                    >
                                        Edit
                                    </span>
                                    <span
                                        onClick={() => handleDeleteUser(element._id)}
                                        className='px-2 text-orange-600 cursor-pointer hover:underline'
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='w-full text-right flex justify-center'>
                    <Pagination totalCount={quantity} />
                </div>
            </div>
        </div>
    );
};

export default memo(ManageUser);
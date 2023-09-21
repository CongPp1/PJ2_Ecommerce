import React, { memo, useCallback, useEffect, useState } from 'react';
import { apiGetProducts } from '../../APIs/product';
import { renderStars } from '../../utils/helper';
import Pagination from '../../components/Pagination/Pagination';
import useDebounce from '../../custom-hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import InputField from '../../components/Input/InputField';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/appReducer';
import EditingProductPopup from './EditingProductPopup';
import { apiUpdateProduct } from '../../APIs/product';


const ManageProduct = () => {
    const [products, setProducts] = useState(null);
    const [productQuantity, setProductQuantity] = useState(0);
    const [queries, setQueries] = useState({ q: '' });
    const [params] = useSearchParams();
    const queriesDebounce = useDebounce(queries.q, 800);
    const dispatch = useDispatch();

    const fetchedProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: 10 });
        if (response.message === 'Get all products successfully') {
            setProducts(response.data.products);
            setProductQuantity(response.data.quantity);
        }
    };

    const handleUpdate = async (productId, updatedData) => {
        console.log('alsalsk')
        // try {
        //     const response = await apiUpdateProduct(updatedData, productId);
        //     if (response.message === 'Update product successfully') {
        //         toast.success('Cập nhật người dùng thành công');
        //         render();
        //     } else {
        //         toast.error(response.message);
        //     }
        // } catch (error) {
        //     console.log(error)
        //     toast.error('Có lỗi xảy ra khi cập nhật người dùng');
        // }
        console.log('updateData',updatedData)
        // if( updatedData.category) {
        //     updatedData.category = products?.find(item => item._id === updatedData.category)?.title;
        //     console.log('updatedData category',updatedData.category)
        // }
    };

    const handleEditingProductPopup = useCallback((element) => {
        dispatch(showModal({
            isShowModal: true,
            modalChildren: <EditingProductPopup handleUpdate={handleUpdate} data={element}/>
        }))
    }, []);

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (queriesDebounce) {
            queries.q = queriesDebounce;
        }
        fetchedProducts(queries);
    }, [queriesDebounce, params]);

    return (
        <div className='w-full pl-4 pr-4 flex flex-col gap-4'>
            <div className='p-4 border-b w-full flex justify-between items-center border-gray-300'>
                <h1 className='text-3xl font-bold tracking-tight '>Manage Product</h1>
            </div>
            <div className='flex justify-end py-4 w-[500px]'>
                <InputField placeholder='Search by product name...' value={queries.q} setValue={setQueries} nameKey={'q'} />
            </div>
            <table className='table-auto mb-6 text-left w-full'>
                <thead className='font-bold bg-gray-700 text-[18px] border border-gray-500 text-white'>
                    <tr>
                        <th className='px-4 py-2'>STT</th>
                        <th className='px-4 py-2'>Image</th>
                        <th className='px-4 py-2'>Title</th>
                        <th className='px-4 py-2'>Brand</th>
                        <th className='px-4 py-2'>Category</th>
                        <th className='px-4 py-2'>Quantity</th>
                        <th className='px-4 py-2'>Sold</th>
                        <th className='px-4 py-2'>Color</th>
                        <th className='px-4 py-2'>Social rating</th>
                        <th className='px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((element, index) => (
                        <tr key={index} className='border border-gray-500'>
                            <td className='text-center'>{(params.get('page') === 1 || params.get('page') === null) ? index + 1 : (params.get('page') - 1) * 10 + (index + 1)}</td>
                            <td>
                                <img src={element.images[0]} alt="images" className='w-12 h-12 object-cover' />
                            </td>
                            <td>{element.title}</td>
                            <td>{element.brand}</td>
                            <td>{element.category}</td>
                            <td>{element.quantity}</td>
                            <td className='text-center py-2'>{element.sold}</td>
                            <td>{element.color}</td>
                            <td className='flex text-center'>{renderStars(element.totalRatings)}</td>
                            <td className='flex gap-2'>
                                <span
                                    className='px-2 text-orange-600 cursor-pointer hover:underline'
                                    onClick={() => handleEditingProductPopup(element)}
                                >
                                    Edit
                                </span>
                                <span className='px-2 text-orange-600 cursor-pointer hover:underline'>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full text-right flex justify-center'>
                <Pagination totalCount={productQuantity} />
            </div>
        </div>
    );
};

export default memo(ManageProduct);
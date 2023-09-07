import React, { memo } from 'react';
import usePagination from '../../custom-hooks/usePagination';
import Items from '../Pagination/Items';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount }) => {
    const pagination = usePagination(totalCount, 2);
    const [param] = useSearchParams();

    const range = () => {
        const currentPage = +param.get('page');
        const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
        const start = ((currentPage - 1) * pageSize) + 1;
        const end = Math.min(currentPage * pageSize, totalCount);

        return `${start} - ${end}`;
    }

    return (
        <div className='flex w-main justify-between items-center'>
            {!+param.get('page') && (
                <span className='text-sm italic'>{`Show products 1 - ${+process.env.REACT_APP_PRODUCT_LIMIT || 10} of ${totalCount}`}</span>
            )}
            {+param.get('page') && (
                <span className='text-sm italic'>{`Show products ${range()} of ${totalCount}`}</span>
            )}
            <div className='flex items-center'>
                {pagination?.map((element, index) => (
                    <Items key={index}>
                        {element}
                    </Items>
                ))}
            </div>
        </div>
    );
};

export default memo(Pagination);
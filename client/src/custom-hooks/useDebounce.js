import React, { useEffect, useState } from 'react';

const useDebounce = (value, delayTime) => {
    const [debounce, setDebounce] = useState('');

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            setDebounce(value);
        }, delayTime);
        return () => {
            clearTimeout(setTimeoutId);
        }
    }, [value, delayTime]);

    return debounce;
};

export default useDebounce;
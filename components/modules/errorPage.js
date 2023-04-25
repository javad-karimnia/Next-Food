import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const Error = () => {

    useEffect (() => {
        toast.error('خطای سرور')
    }, [])
    return (
        <div>
            {}
        </div>
    );
};

export default Error;
import Image from 'next/image';
import React from 'react';

const Spinner = () => {
    return (
        <div className='Spinner'>
            <Image src='/images/Spinner.gif' alt='Spinner' width={200} height={200}/>
        </div>
    );
};

export default Spinner;
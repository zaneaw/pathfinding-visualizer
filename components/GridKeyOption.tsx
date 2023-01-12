import React from 'react';

interface Props {
    keyName: string;
    KeyIcon?: React.ElementType;
    keyStyles?: string;
}

const GridKeyOption: React.FC<Props> = ({keyName, KeyIcon, keyStyles}) => {
    return (
        <div className='flex flex-row gap-1 items-center justify-center'>
            <p>{keyName}:&nbsp;</p>
            <div className={`w-6 h-6 flex justify-center items-center border-2 border-black ${keyStyles ? keyStyles : ''}`}>
                {KeyIcon ? <KeyIcon /> : ''}
            </div>
        </div>
    );
};

export default GridKeyOption;

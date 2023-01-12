import React from 'react';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const ToolbarSection: React.FC<Props> = (props) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-4 pt-4'>
            {props.children}
        </div>
    );
};

export default ToolbarSection;

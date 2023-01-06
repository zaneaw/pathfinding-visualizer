import React from 'react';

type Props = {
    handleClick: () => void;
    title: string;
    icon: any;
    styles: any;
};

const ToolbarButton: React.FC<Props> = ({
    handleClick,
    title,
    icon,
    styles,
}) => {
    return (
        <div
            onClick={handleClick}
            className={`flex flex-row justify-center items-center gap-1 py-1 px-2 text-center rounded border-2 border-slate-500 hover:bg-slate-500 hover:cursor-pointer ${styles}`}
        >
            {title}
            {icon ? icon : ''}
        </div>
    );
};

export default ToolbarButton;

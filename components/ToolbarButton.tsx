import React from 'react';

type Props = {
    handleClick: () => void;
    title: string;
    icon: any;
    styles: any;
    isAlgoRunning: boolean | null;
};

const ToolbarButton: React.FC<Props> = ({
    handleClick,
    title,
    icon,
    styles,
    isAlgoRunning,
}) => {
    return (
        <button
            onClick={handleClick}
            className={`flex flex-row justify-center items-center gap-1 py-1 px-2 text-center rounded border-2 border-slate-500 hover:cursor-pointer transition-all ease-in duration-150 ${styles} ${isAlgoRunning ? 'bg-slate-500' : 'hover:bg-green-500'}`}
            disabled={isAlgoRunning ? true : false}
        >
            {title}
            {icon ? icon : ''}
        </button>
    );
};

export default ToolbarButton;

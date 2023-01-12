import React from 'react';

type Props = {
    handleClick: () => void;
    title: string;
    Icon?: React.ElementType;
    styles?: string;
    isAlgoRunning?: boolean;
    iconOnMobile?: boolean;
};

const ToolbarButton: React.FC<Props> = ({
    handleClick,
    title,
    Icon,
    styles,
    isAlgoRunning,
    iconOnMobile,
}) => {
    return (
        <button
            onClick={handleClick}
            className={`min-w-[88px] md:min-w-fit px-1 py-1 xs:px-2 xs:py-2 flex flex-row justify-center items-center md:gap-1 text-center rounded border-2 border-slate-500 hover:cursor-pointer transition-all ease-in duration-150 ${styles} ${isAlgoRunning ? 'bg-slate-500 hover:cursor-default' : 'hover:bg-green-500'}`}
            disabled={isAlgoRunning ? true : false}
        >
            <h2 className='text-sm md:text-base'>
                {title}
            </h2>
            <div className={`${iconOnMobile ? 'block' : 'hidden md:block'}`}>
                {Icon ? <Icon /> : ''}
            </div>
        </button>
    );
};

export default ToolbarButton;

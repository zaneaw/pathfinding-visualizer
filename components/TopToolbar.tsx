import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { GiFinishLine, GiStoneWall } from 'react-icons/gi';
import { BsChevronDown } from 'react-icons/bs';

interface Props {
    isSelected: string;
    toggleSelected: (button: string) => void;
    startAlgo: () => void;
    resetGrid: () => void;
}

const Toolbar: React.FC<Props> = ({
    isSelected,
    toggleSelected,
    startAlgo,
    resetGrid,
}) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-around gap-4 mb-4 pt-4'>
                <div className='flex flex-row items-center justify-center gap-1'>
                    <p>Algorithms</p>
                    <BsChevronDown />
                </div>
                |
                <div
                    onClick={() => toggleSelected('start')}
                    className={`flex flex-row items-center justify-center gap-1 py-1 px-2 rounded hover:cursor-pointer ${
                        isSelected === 'start' ? 'bg-gray-500' : ''
                    }`}
                >
                    <p>Choose Start</p>
                    <FiMapPin />
                </div>
                <div
                    onClick={() => toggleSelected('end')}
                    className={`flex flex-row items-center justify-center gap-1 py-1 px-2 rounded hover:cursor-pointer ${
                        isSelected === 'end' ? 'bg-gray-500' : ''
                    }`}
                >
                    <p>Choose End</p>
                    <GiFinishLine />
                </div>
                <div
                    onClick={() => toggleSelected('wall')}
                    className={`flex flex-row items-center justify-center gap-1 py-1 px-2 rounded hover:cursor-pointer ${
                        isSelected === 'wall' ? 'bg-gray-500' : ''
                    }`}
                >
                    <p>Build Wall</p>
                    <GiStoneWall />
                </div>
            </div>
            <div className='flex flex-row items-center justify-around gap-4 mb-4 pt-4'>
                <div onClick={() => startAlgo()} className={`py-1 w-40 text-center rounded border-2 border-slate-500 hover:bg-slate-500 hover:cursor-pointer`}>Run Algorithm</div>
                <div onClick={() => resetGrid()} className={`py-1 w-40 text-center rounded border-2 border-slate-500 hover:bg-slate-500 hover:cursor-pointer`}>Reset Grid</div>
            </div>
        </div>
    );
};

export default Toolbar;

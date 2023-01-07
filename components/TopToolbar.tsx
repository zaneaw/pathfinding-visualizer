import React from 'react';
import ToolbarButton from './ToolbarButton';
import { FiMapPin } from 'react-icons/fi';
import { GiFinishLine, GiStoneWall } from 'react-icons/gi';
import { BsChevronDown } from 'react-icons/bs';

interface GridSize {
    rows: number;
    columns: number;
}

interface Props {
    isSelected: string;
    toggleSelected: (button: string) => void;
    startAlgo: () => void;
    createGrid: () => void;
    resetGrid: (action: number) => void;
    gridSize: GridSize;
    handleGridSizeChange: (e: any) => void;
}

const Toolbar: React.FC<Props> = ({
    isSelected,
    toggleSelected,
    startAlgo,
    createGrid,
    resetGrid,
    gridSize,
    handleGridSizeChange,
}) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-around gap-4 mb-4 pt-4'>
                <ToolbarButton 
                    handleClick={() => console.log('Algorithms clicked')} 
                    title={"Algorithms"} 
                    icon={<BsChevronDown />}
                    styles={null}
                />
                |
                <ToolbarButton 
                    handleClick={() => toggleSelected('start')}
                    title={"Choose Start"}
                    icon={<FiMapPin />}
                    styles={isSelected === 'start' ? 'bg-gray-500' : ''}
                />
                <ToolbarButton 
                    handleClick={() => toggleSelected('end')}
                    title={"Choose End"}
                    icon={<GiFinishLine />}
                    styles={isSelected === 'end' ? 'bg-gray-500' : ''}
                />
                <ToolbarButton 
                    handleClick={() => toggleSelected('wall')}
                    title={"Build Walls"}
                    icon={<GiStoneWall />}
                    styles={isSelected === 'wall' ? 'bg-gray-500' : ''}
                />
            </div>

            <div className='flex flex-row items-center justify-around gap-4 mb-4 pt-4'>
                <ToolbarButton 
                    handleClick={() => startAlgo()}
                    title={"Run Algorithm"}
                    icon={null}
                    styles={null}
                />
                <ToolbarButton 
                    handleClick={() => resetGrid(1)}
                    title={"Randomize Start and End"}
                    icon={null}
                    styles={null}
                />
                <ToolbarButton 
                    handleClick={() => resetGrid(4)}
                    title={"Reset Walls"}
                    icon={null}
                    styles={null}
                />
                <ToolbarButton 
                    handleClick={() => resetGrid(2)}
                    title={"Reset Results"}
                    icon={null}
                    styles={null}
                />
                <ToolbarButton 
                    handleClick={() => {
                        resetGrid(2) 
                        resetGrid(4)
                    }}
                    title={"Reset Grid"}
                    icon={null}
                    styles={null}
                />
            </div>

            <div className='flex flex-row items-center justify-around gap-4 mb-4 pt-4'>

                <div
                    className={`py-1 w-40 text-center`}
                >
                    Modify Grid Size:
                </div>
                <div
                    className={`py-1 w-40 text-center`}
                >
                    <label>Columns</label>
                    <input id="columns-input" type="number" value={gridSize.columns} onChange={handleGridSizeChange} />
                </div>
                <div
                    className={`py-1 w-40 text-center`}
                >
                    <label>Rows</label>
                    <input id="rows-input" type="number" value={gridSize.rows} onChange={handleGridSizeChange} />
                </div> 
            </div>
        </div>
    );
};

export default Toolbar;

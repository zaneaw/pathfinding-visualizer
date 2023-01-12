import React from 'react';
import ToolbarButton from './ToolbarButton';
import ToolbarSection from './ToolbarSection';
import GridKeyToolbar from './GridKeyToolbar';
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
    algoSpeed: number;
    handleAlgoSpeedChange: (e: any) => void;
    isAlgoRunning: boolean;
}

const Toolbar: React.FC<Props> = ({
    isSelected,
    toggleSelected,
    startAlgo,
    createGrid,
    resetGrid,
    gridSize,
    handleGridSizeChange,
    algoSpeed,
    handleAlgoSpeedChange,
    isAlgoRunning,
}) => {
    return (
        <div className='flex flex-row items-center justify-around flex-wrap px-2 py-4 gap-2'>
            <ToolbarSection>
                <ToolbarButton 
                    handleClick={() => console.log('Algorithms clicked')} 
                    title={"Algorithms"} 
                    icon={<BsChevronDown />}
                    styles={null}
                    isAlgoRunning={null}
                    iconOnMobile={true}
                />
                <ToolbarButton 
                    handleClick={() => startAlgo()}
                    title={"Visualize!"}
                    icon={null}
                    styles={null}
                    isAlgoRunning={isAlgoRunning}
                />
            </ToolbarSection>

            <ToolbarSection>
                <ToolbarButton 
                    handleClick={() => toggleSelected('start')}
                    title={"Choose Start"}
                    icon={<FiMapPin />}
                    styles={isSelected === 'start' ? 'bg-gray-500' : ''}
                    isAlgoRunning={isAlgoRunning}
                />
                <ToolbarButton 
                    handleClick={() => toggleSelected('end')}
                    title={"Choose End"}
                    icon={<GiFinishLine />}
                    styles={isSelected === 'end' ? 'bg-gray-500' : ''}
                    isAlgoRunning={isAlgoRunning}
                />
                <ToolbarButton 
                    handleClick={() => toggleSelected('wall')}
                    title={"Build Walls"}
                    icon={<GiStoneWall />}
                    styles={isSelected === 'wall' ? 'bg-gray-500' : ''}
                    isAlgoRunning={isAlgoRunning}
                />
            </ToolbarSection>

            <ToolbarSection>
                <ToolbarButton 
                    handleClick={() => resetGrid(1)}
                    title={"Randomize Start and End"}
                    icon={null}
                    styles={null}
                    isAlgoRunning={isAlgoRunning}
                />
                <ToolbarButton 
                    handleClick={() => resetGrid(3)}
                    title={"Reset Walls"}
                    icon={null}
                    styles={null}
                    isAlgoRunning={isAlgoRunning}
                />
                <ToolbarButton 
                    handleClick={() => resetGrid(2)}
                    title={"Reset Results"}
                    icon={null}
                    styles={null}
                    isAlgoRunning={isAlgoRunning}
                />
                <ToolbarButton 
                    handleClick={() => {
                        resetGrid(2) 
                        resetGrid(3)
                    }}
                    title={"Reset Grid"}
                    icon={null}
                    styles={null}
                    isAlgoRunning={isAlgoRunning}
                />
            </ToolbarSection>

            <ToolbarSection>
                <div
                    className={`py-1 w-40 text-center`}
                >
                    Modify Grid Size:
                </div>
                <div
                    className={`flex flex-row items-center justify-center py-1 w-40 text-center gap-4`}
                >
                    <label>Columns</label>
                    <input id="columns-input" type="number" value={gridSize.columns} onChange={handleGridSizeChange} disabled={isAlgoRunning ? true : false} className="w-16 rounded px-2 py-1" />
                </div>
                <div
                    className={`flex flex-row items-center justify-center py-1 w-40 text-center gap-4`}
                >
                    <label>Rows</label>
                    <input id="rows-input" type="number" value={gridSize.rows} onChange={handleGridSizeChange} disabled={isAlgoRunning ? true : false} className="w-16 rounded px-2 py-1" />
                </div> 
            </ToolbarSection>

            <ToolbarSection>
                <p className={`py-1 w-fit text-center`}>
                    Modify Algorithm Speed:
                </p>
                <input id="columns-input" type="range" min="5" max="200" step="5" value={algoSpeed} onChange={handleAlgoSpeedChange} disabled={isAlgoRunning ? true : false} />
            </ToolbarSection>

            <ToolbarSection>
                <GridKeyToolbar />
            </ToolbarSection>
            
        </div>
    );
};

export default Toolbar;

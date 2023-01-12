import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { GiFinishLine, GiStoneWall } from 'react-icons/gi';

interface Node {
    id: number;
    col: number;
    row: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isWeight: boolean;
    isVisited: boolean;
    distance: number;
    prevNode: Node | null;
    customStyles: string;
}

interface Props {
    node: Node;
    handleMouseDown: (node: Node) => void;
    handleMouseEnter: (node: Node) => void;
    handleMouseUp: () => void;
    topBorder: boolean;
    botBorder: boolean;
    leftBorder: boolean;
    rightBorder: boolean;
}

const NodeDisplay: React.FC<Props> = ({
    node,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    topBorder,
    botBorder,
    leftBorder,
    rightBorder,
}) => {
    return (
        <div
            id={String(node.id)}
            onMouseDown={() => handleMouseDown(node)}
            onMouseEnter={() => handleMouseEnter(node)}
            onMouseUp={() => handleMouseUp()}
            className={`w-6 h-6 flex justify-center items-center border-[1px] border-black transition-all ease-in duration-150 ${
                topBorder ? 'border-t-2' : ''
            } ${botBorder ? 'border-b-2' : ''} ${
                leftBorder ? 'border-l-2' : ''
            } ${rightBorder ? 'border-r-2' : ''}
            ${node.isStart ? 'bg-green-500' : ''}
            ${node.isEnd ? 'bg-red-500' : ''}
            ${node.isWall ? 'bg-gray-500' : ''}
            ${node.customStyles}`}
        >
            {node.isStart ? (
                <FiMapPin className='transition-all ease-in duration-150' />
            ) : node.isEnd ? (
                <GiFinishLine className='transition-all ease-in duration-150' />
            ) : node.isWall ? (
                <GiStoneWall className='transition-all ease-in duration-150 pointer-events-none' />
            ) : (
                ''
            )}
        </div>
    );
};

export default NodeDisplay;

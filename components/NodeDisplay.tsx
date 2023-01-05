import React from 'react';

interface Node {
    col: number;
    row: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isVisited: boolean;
    distance: number;
    prevNode: Node | null;
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
            onMouseDown={() => handleMouseDown(node)}
            onMouseEnter={() => handleMouseEnter(node)}
            onMouseUp={() => handleMouseUp()}
            className={`w-6 h-6 border-[1px] border-black ${
                topBorder ? 'border-t-2' : ''
            } ${botBorder ? 'border-b-2' : ''} ${
                leftBorder ? 'border-l-2' : ''
            } ${rightBorder ? 'border-r-2' : ''}
            ${node.isStart ? 'bg-green-500' : ''}
            ${node.isEnd ? 'bg-red-500' : ''}
            ${node.isWall ? 'bg-gray-500' : ''}`}
        ></div>
    );
};

export default NodeDisplay;

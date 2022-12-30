import React, { useState } from 'react';
import { FiMapPin } from "react-icons/fi";
import { GiFinishLine, GiStoneWall } from "react-icons/gi";

interface Node {
    y: number,
    x: number,
}

interface Props {
    clickNode: (coordinates: Node) => void,
    top: boolean,
    bottom: boolean,
    left: boolean,
    right: boolean,
    coordinates: Node,
    startNode: Node,
    endNode: Node,
    wallNodes: Node[],
}


const NodeDisplay: React.FC<Props> = ({ clickNode, top, bottom, left, right, coordinates, startNode, endNode, wallNodes }) => {
    return (
        <div onClick={() => clickNode({y: coordinates.y, x: coordinates.x})}
            className={`w-4 h-4 flex items-center justify-center border-[1px] border-black hover:bg-red-500
                ${top ? 'border-t-2' : ''} ${bottom ? 'border-b-2' : ''}
                ${left ? 'border-l-2' : ''} ${right ? 'border-r-2' : ''}
                `}
                
        >
            {startNode.x === coordinates.x && startNode.y === coordinates.y
                ? <FiMapPin />
                : endNode.x === coordinates.x && endNode.y === coordinates.y
                ? <GiFinishLine />
                : ''
            }
        </div>
    );
}


export default NodeDisplay;

import React, { useState } from 'react'

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
}


const NodeDisplay: React.FC<Props> = ({ clickNode, top, bottom, left, right, coordinates }) => {
    const [highlight, setHighlight] = useState<boolean>(false);

    return (
        <div onClick={() => clickNode({y: coordinates.y, x: coordinates.x})}
            className={`w-4 h-4 border-[1px] border-black hover:bg-red-500
                ${highlight ? 'bg-orange-500' : ''} 
                ${top ? 'border-t-2' : ''} ${bottom ? 'border-b-2' : ''}
                ${left ? 'border-l-2' : ''} ${right ? 'border-r-2' : ''}
                `}
        ></div>
    );
}


export default NodeDisplay;

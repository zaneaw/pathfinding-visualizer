import React from 'react';
import NodeDisplay from './NodeDisplay';


interface Node {
    y: number,
    x: number,
}

interface Props {
    clickNode: (coordinates: Node) => void,
    row: Node[],
    top: boolean,
    bottom: boolean,
}


const RowDisplay: React.FC<Props> = ({ clickNode, row, top, bottom }) => {
    return (
        <div className="flex flex-row border-black">
            {row.map((node) => {
                return (
                    <NodeDisplay 
                        key={String(node.y) + String(node.x)}
                        clickNode={clickNode}
                        top={top}
                        bottom={bottom}
                        left={node.x === 0}
                        right={node.x === row.length - 1}
                        coordinates={node}
                    />
                )
            })}
        </div>
    )
}


export default RowDisplay;

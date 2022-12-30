import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import RowDisplay from './RowDisplay';
import { start } from 'repl';

interface Node {
    y: number,
    x: number,
}

const PathfindingVisualizer: React.FC = () => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [isSelected, setIsSelected] = useState<string>('');
    const [startNode, setStartNode] = useState<Node>({y: 5, x: 5});
    const [endNode, setEndNode] = useState<Node>({y: 15, x: 45});
    const [wallNodes, setWallNodes] = useState<Node[]>([])

    const toggleSelected = (button: string) => {
        if (isSelected === button) {
            setIsSelected('');
        } else {
            setIsSelected(button);
        };
    };

    const clickNode = (coordinates: Node) => {
        if (isSelected === 'start') {
            console.log(coordinates)
            setStartNode(coordinates);
        } else if (isSelected === 'end') {
            setEndNode(coordinates)
        } else if (isSelected === 'wall') {
            setWallNodes([...wallNodes, coordinates])
        } else {
            console.log('Clicked: ', coordinates);
        };
    };

    console.log(wallNodes);

    useEffect(() => {
        const rows: Node[][] = [];
    
        for (let y = 0; y < 20; y++) {
            let currRow: Node[] = [];

            for (let x = 0; x < 50; x++) {
                currRow.push({ y, x })
            }
            rows.push(currRow);
        }

        setGrid(rows);
    }, [])
    
    return (
        <div className='h-screen bg-[cornflowerblue]'>
            <Toolbar isSelected={isSelected} toggleSelected={toggleSelected} />
            <div className='flex flex-col items-center justify-center'>
                {grid.map((row: Node[], i) => {
                    return (
                        <RowDisplay 
                            key={i}
                            clickNode={clickNode}
                            row={row}
                            top={row[0].y === 0}
                            bottom={row[0].y === grid.length - 1}
                            startNode={startNode}
                            endNode={endNode}
                            wallNodes={wallNodes}
                        />             
                    )
                })}
            </div>
        </div>
    )
}


export default PathfindingVisualizer;
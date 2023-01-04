import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import NodeDisplay from './NodeDisplay';

interface Node {
    col: number;
    row: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
}

const PathfindingVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<Node[][]>([]);
    const [isSelected, setIsSelected] = useState<string>('');
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (currNode: Node) => {
        setIsMouseDown(true);
        handleMouseEnter(currNode, true);
    }

    const handleMouseEnter = (currNode: Node, first?: boolean) => {
        if (!isMouseDown && !first) {
            return;
        }
        clickNode(currNode);
    }

    const handleMouseUp = () => {
        setIsMouseDown(false);
    }

    const toggleSelected = (button: string) => {
        if (isSelected === button) {
            setIsSelected('');
        } else {
            setIsSelected(button);
        };
    };

    const clickNode = (currNode: Node) => {
        if (!isSelected) {
            return;
        }

        const varName: keyof Node = isSelected === 'start' 
            ? 'isStart' 
            : isSelected === 'end'
            ? 'isEnd'
            : 'isWall';

        if (varName !== 'isWall' && (currNode.isStart || currNode.isEnd)) {
            return;
        }

        const nextNodes = nodes.map(row => {
            row.map(node => {
                if (varName !== 'isWall') {
                    if ((currNode.col === node.col && currNode.row === node.row && !node[varName]) || node[varName]) {
                        node[varName] = !node[varName];
                        node.isWall = false;
                        return {...node};
                    }
                } else {
                    if (currNode.col === node.col && currNode.row === node.row) {
                        node[varName] = !node[varName];
                        return {...node};
                    }
                }
                return node;
            })
            return [...row];
        })

        setNodes(nextNodes);
    };

    useEffect(() => {
        const rows: Node[][] = [];

        for (let y = 0; y < 20; y++) {
            let currRow: Node[] = [];

            for (let x = 0; x < 20; x++) {
                currRow.push({
                    col: y,
                    row: x,
                    isStart: y === 0 && x === 0 ? true : false,
                    isEnd: y === 1 && x === 1 ? true : false,
                    isWall: false,
                });
            }
            rows.push(currRow);
        }

        setNodes(rows);
    }, []);

    return (
        <div className='h-screen bg-[cornflowerblue]'>
            <Toolbar isSelected={isSelected} toggleSelected={toggleSelected} />
            <div className='flex flex-col items-center justify-center'>
                {nodes.map((row: Node[], i: number) => {
                    const topBorder = row[0].col === 0 ? true : false;
                    const botBorder =
                        row[0].col === nodes.length - 1 ? true : false;
                    return (
                        <div
                            key={i}
                            className='flex flex-row items-center justify-center'
                        >
                            {row.map((node: Node, j: number) => {
                                const leftBorder = node.row === 0 ? true : false;
                                const rightBorder =
                                    node.row === row.length - 1 ? true : false;
                                return (
                                    <NodeDisplay
                                        key={Number(String(i) + String(j))}
                                        node={node}
                                        handleMouseDown={handleMouseDown}
                                        handleMouseEnter={handleMouseEnter}
                                        handleMouseUp={handleMouseUp}
                                        topBorder={topBorder}
                                        botBorder={botBorder}
                                        leftBorder={leftBorder}
                                        rightBorder={rightBorder}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PathfindingVisualizer;

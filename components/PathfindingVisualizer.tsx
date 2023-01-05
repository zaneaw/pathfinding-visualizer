import React, { useState, useEffect } from 'react';
import TopToolbar from './TopToolbar';
import NodeDisplay from './NodeDisplay';

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

const PathfindingVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<Node[][]>([]);
    const [isSelected, setIsSelected] = useState<string>('');
    const [isMouseDown, setIsMouseDown] = useState(false);

    // Selector for toolbar
    const toggleSelected = (button: string): void => {
        if (isSelected === button) {
            setIsSelected('');
        } else {
            setIsSelected(button);
        }
    };

    // Start Algo
    const startAlgo = (): void => {
        // run the algorithm
    };

    // Reset Grid
    const resetGrid = (): void => {
        createGrid();
    };

    // Mouse events
    const handleMouseDown = (currNode: Node): void => {
        setIsMouseDown(true);
        clickNode(currNode);
    };

    const handleMouseEnter = (currNode: Node): void => {
        if (!isMouseDown) {
            return;
        }
        clickNode(currNode);
    };

    const handleMouseUp = (): void => {
        setIsMouseDown(false);
    };

    const clickNode = (currNode: Node): void => {
        if (!isSelected) {
            return;
        }

        const varName: keyof Node =
            isSelected === 'start'
                ? 'isStart'
                : isSelected === 'end'
                ? 'isEnd'
                : 'isWall';

        if (varName !== 'isWall' && (currNode.isStart || currNode.isEnd)) {
            return;
        }

        const nextNodes = nodes.map((row) => {
            row.map((node) => {
                if (varName !== 'isWall') {
                    if (
                        (currNode.col === node.col &&
                            currNode.row === node.row &&
                            !node[varName]) ||
                        node[varName]
                    ) {
                        node[varName] = !node[varName];
                        node.isWall = false;
                        return { ...node };
                    }
                } else {
                    if (
                        currNode.col === node.col &&
                        currNode.row === node.row
                    ) {
                        node[varName] = !node[varName];
                        return { ...node };
                    }
                }
                return node;
            });
            return [...row];
        });

        setNodes(nextNodes);
    };

    // Create / Reset Grid
    const createGrid = () => {
        const rows: Node[][] = [];

        for (let y = 0; y < 20; y++) {
            let currRow: Node[] = [];

            for (let x = 0; x < 20; x++) {
                currRow.push({
                    // create each node
                    col: y,
                    row: x,
                    isStart: y === 0 && x === 0 ? true : false,
                    isEnd: y === 1 && x === 1 ? true : false,
                    isWall: false,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null,
                });
            }

            rows.push(currRow);
        }

        setNodes(rows);
    };

    useEffect(() => {
        createGrid();
    }, []);

    return (
        <div className='h-screen bg-[cornflowerblue]'>
            <TopToolbar
                isSelected={isSelected}
                toggleSelected={toggleSelected}
                startAlgo={startAlgo}
                resetGrid={resetGrid}
            />
            <div className='flex flex-col items-center justify-center'>
                {/* Create grid display on page */}
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
                                const leftBorder =
                                    node.row === 0 ? true : false;
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

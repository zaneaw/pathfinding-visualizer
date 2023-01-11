import React, { useState, useEffect, useCallback, useRef } from 'react';
import TopToolbar from './TopToolbar';
import NodeDisplay from './NodeDisplay';
import { dijkstras, getNodesInShortestPath } from '../algorithms/dijkstras';

interface Node {
    id: number;
    col: number;
    row: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isVisited: boolean;
    distance: number;
    prevNode: Node | null;
    customStyles: string;
}

interface GridSize {
    rows: number;
    columns: number;
}

const PathfindingVisualizer: React.FC = () => {
    const [gridNodes, setGridNodes] = useState<Node[][]>([]);
    const [gridSize, setGridSize] = useState<GridSize>({
        rows: 20,
        columns: 20,
    });
    const [isSelected, setIsSelected] = useState<string>('');
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [algoSpeed, setAlgoSpeed] = useState<number>(10);
    const isAlgoRunning = useRef<boolean>(false);

    // Selector for toolbar
    const toggleSelected = (button: string): void => {
        if (isSelected === button) {
            setIsSelected('');
        } else {
            setIsSelected(button);
        }
    };

    // Run the Algo
    const startAlgo = (): void => {
        resetGrid(2);
        isAlgoRunning.current = true;
        const [visitedNodes, endNode]: [Node[], Node] = dijkstras(gridNodes);
        const nodesInShortestPath = getNodesInShortestPath(endNode);
        animateDijkstra(visitedNodes, nodesInShortestPath);
    };

    const animateDijkstra = (
        visitedNodes: Node[],
        nodesInShortestPath: Node[]
    ) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPath);
                }, algoSpeed * i);
                return;
            }
            setTimeout(() => {
                const currNode = visitedNodes[i];

                const nextNodes = gridNodes.map(row => {
                    row.map(node => {
                        if (node.id === currNode.id && !node.isStart && !node.isEnd) {
                            node.customStyles = "bg-purple-500";
                            return {...node};
                        }
                        return node;
                    })
                    return [...row]
                })

                setGridNodes(nextNodes);
            }, algoSpeed * i);
        }
        if (!!nodesInShortestPath.length) {
            isAlgoRunning.current = false;
        }
    };

    const animateShortestPath = (nodesInShortestPath: Node[]) => {
        const shortestPathTiming: number = (algoSpeed < 50) ? (algoSpeed * 5) : (algoSpeed * 2);

        setTimeout(() => {
            isAlgoRunning.current = false;
        }, (shortestPathTiming * nodesInShortestPath.length - shortestPathTiming))

        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const currNode = nodesInShortestPath[i];
                
                const nextNodes = gridNodes.map(row => {
                    row.map(node => {
                        if (node.id === currNode.id && !node.isStart && !node.isEnd) {
                            node.customStyles = "bg-yellow-500";
                            return {...node};
                        }
                        return node;
                    })
                    return [...row]
                })
                
                setGridNodes(nextNodes);
            }, (shortestPathTiming * i));
        }
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

        // stop from trying to overwrite a start or end node
        if (currNode.isStart || currNode.isEnd) {
            return;
        }

        // loop over nodes to change necessary nodes
        const nextNodes = gridNodes.map((row) => {
            row.map((node) => {
                // start or end is selected
                if (varName !== 'isWall') {
                    // if node in loop = node selected
                    // or if node is start/is end
                    // set selected node to start/end
                    // unset currently selected node to not start/end
                    if ((currNode.id === node.id && !node[varName]) || node[varName]) {
                        node[varName] = !node[varName];
                        node.isWall = false;
                        return {...node};
                    }
                // wall is selected
                } else if (varName === 'isWall' ) {
                    // remove or add wall to selected node
                    if (currNode.id === node.id) {
                        node.isWall = !node.isWall;
                        return { ...node };
                    }
                }
                return node;
            });
            return [...row];
        });

        setGridNodes(nextNodes);
    };

    const randomNumGen = (max: number): number => {
        return Math.floor(Math.random() * max);
    };

    const getNewPoints = useCallback(() => {
        const startCol = randomNumGen(gridSize.columns);
        const startRow = randomNumGen(gridSize.rows);
        let endCol = randomNumGen(gridSize.columns);
        let endRow = randomNumGen(gridSize.rows);

        // start and end points are the same, redo the endpoint
        if (startCol === endCol && startRow === endRow) {
            endCol = randomNumGen(gridSize.columns);
            endRow = randomNumGen(gridSize.rows);
        }

        return [startCol, startRow, endCol, endRow];
    }, [gridSize]);

    const handleGridSizeChange = (e: any) => {
        const editCols = e.target.id === 'columns-input' ? true : false;

        if (editCols) {
            setGridSize({ ...gridSize, columns: e.target.value });
        } else {
            setGridSize({ ...gridSize, rows: e.target.value });
        }
    };

    const handleAlgoSpeedChange = (e: any) => {
        setAlgoSpeed(e.target.value);
    }

    const resetGrid = (action?: number): void => {
        if (action) {
            if (action === 1) { // randomize start and end points
                // set random start and end points on grid based on grid size
                let [startCol, startRow, endCol, endRow] = getNewPoints();

                const nextNodes = gridNodes.map(row => {
                    row.map(node => {
                        if (node.col === startCol && node.row === startRow) {
                            node.isStart = true;
                            node.isWall = false;
                            return {...node};
                        } else if (node.isStart && (node.col !== startCol || node.row !== startRow)) {
                            node.isStart = false;
                            return {...node};
                        }
                        if (node.col === endCol && node.row === endRow) {
                            node.isEnd = true;
                            node.isWall = false;
                            return {...node};
                        } else if (node.isEnd && (node.col !== endCol || node.row !== endRow)) {
                            node.isEnd = false;
                            return {...node};
                        }
                        return node;
                    })
                    return [...row];
                })

                setGridNodes(nextNodes);
            } else if (action === 2) { // reset results
                const nextNodes = gridNodes.map(row => {
                    row.map(node => {
                        node.isVisited = false;
                        node.distance = Infinity;
                        node.prevNode = null;
                        node.customStyles = '';
                        return {...node}
                    })
                    return [...row];
                })

                setGridNodes(nextNodes);
            } else if (action === 3) { // reset walls only
                const nextNodes = gridNodes.map(row => {
                    row.map(node => {
                        if (node.isWall) {
                            node.isWall = false;
                            return {...node};
                        }
                        return node;
                    })
                    return [...row];
                })

                setGridNodes(nextNodes)
            }
        }
    }

    // Create / Reset Grid
    const createGrid = useCallback(() => {
        // rows or columns input = 0 || empty
        if (!gridSize.rows || !gridSize.columns || gridSize.rows < 1 || gridSize.columns < 1) {
            // TODO: display notification
            return;
        }

        const rows: Node[][] = [];
        const [startCol, startRow, endCol, endRow] = getNewPoints();
        let nodeStartId = 0;

        for (let x = 0; x < gridSize.rows; x++) {
            let currRow: Node[] = [];
            for (let y = 0; y < gridSize.columns; y++) {
                currRow.push({
                    id: nodeStartId,
                    col: y,
                    row: x,
                    isStart: y === startCol && x === startRow ? true : false,
                    isEnd: y === endCol && x === endRow ? true : false,
                    isWall: false,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null,
                    customStyles: '',
                });
                nodeStartId++;
            }
            rows.push(currRow);
        }

        setGridNodes(rows);
    }, [gridSize, getNewPoints]);

    useEffect(() => {
        createGrid();
    }, [createGrid]);

    return (
        <div className='min-h-screen pb-12 bg-[cornflowerblue]'>
            <TopToolbar
                isSelected={isSelected}
                toggleSelected={toggleSelected}
                startAlgo={startAlgo}
                createGrid={createGrid}
                resetGrid={resetGrid}
                gridSize={gridSize}
                handleGridSizeChange={handleGridSizeChange}
                algoSpeed={algoSpeed}
                handleAlgoSpeedChange={handleAlgoSpeedChange}
                isAlgoRunning={isAlgoRunning.current}
            />
            <div className='flex flex-col items-center justify-center'>
                {gridNodes.map((row: Node[], i: number) => {
                    const topBorder = row[0].row === 0 ? true : false;
                    const botBorder =
                        row[0].row === gridNodes.length - 1 ? true : false;
                    return (
                        <div
                            key={i}
                            className='flex flex-row items-center justify-center'
                        >
                            {row.map((node: Node) => {
                                const leftBorder =
                                    node.col === 0 ? true : false;
                                const rightBorder =
                                    node.col === row.length - 1 ? true : false;
                                return (
                                    <NodeDisplay
                                        key={node.id}
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

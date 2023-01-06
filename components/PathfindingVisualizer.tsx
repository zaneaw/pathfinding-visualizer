import React, { useState, useEffect, useRef, useCallback } from 'react';
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
}

interface GridSize {
    rows: number;
    columns: number;
}

const PathfindingVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<Node[][]>([]);
    const [gridSize, setGridSize] = useState<GridSize>({
        rows: 20,
        columns: 30,
    });
    const [isSelected, setIsSelected] = useState<string>('');
    const [isMouseDown, setIsMouseDown] = useState(false);
    const nodesRef = useRef<HTMLDivElement[]>(new Array());

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !nodesRef.current.includes(el)) {
            nodesRef.current.push(el);
        }
    };

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
        const [visitedNodes, startNode, endNode]: [Node[], Node, Node] =
            dijkstras(nodes);
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
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const nodeId = String(node.id);
                nodesRef.current.map((nodeElement) => {
                    if (
                        nodeElement.id === nodeId &&
                        !node.isStart &&
                        !node.isEnd
                    ) {
                        nodeElement.className += ' bg-purple-500';
                    }
                });
            }, 10 * i);
        }
    };

    const animateShortestPath = (nodesInShortestPath: Node[]) => {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                const nodeId = String(node.id);
                nodesRef.current.map((nodeElement) => {
                    if (
                        nodeElement.id === nodeId &&
                        !node.isStart &&
                        !node.isEnd
                    ) {
                        nodeElement.className = `w-6 h-6 flex justify-center items-center border-[1px] border-black bg-yellow-500 ${
                            node.row === 0
                                ? 'border-t-2'
                                : node.row === gridSize.rows - 1
                                ? 'border-b-2'
                                : ''
                        } ${
                            node.col === 0
                                ? 'border-l-2'
                                : node.col === gridSize.columns -1
                                ? 'border-r-2'
                                : ''
                        }`;
                    }
                });
            }, 50 * i);
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

        // stop from trying to turn start or end nodes into a wall
        if (varName !== 'isWall' && (currNode.isStart || currNode.isEnd)) {
            return;
        }

        // loop over nodes to change necessary nodes
        const nextNodes = nodes.map((row) => {
            row.map((node) => {
                // start or end is selected
                if (varName !== 'isWall') {
                    // if node in loop = node selected
                    // or if node is start/is end
                    // set selected node to start/end
                    // unset currently selected node to not start/end
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
                // wall is selected
                } else {
                    // remove or add wall to selected node
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

    const randomNumGen = (max: number): number => {
        return Math.floor(Math.random() * max);
    };

    const handleGridSizeChange = (e: any) => {
        const editCols = e.target.id === 'columns-input' ? true : false;

        if (editCols) {
            setGridSize({ ...gridSize, columns: e.target.value });
        } else {
            setGridSize({ ...gridSize, rows: e.target.value });
        }
    };

    // Reset Grid
    const resetGrid = (): void => {
        createGrid();
    };

    // Create / Reset Grid
    const createGrid = useCallback(() => {
        // rows or columns input = 0 || empty
        if (!gridSize.rows || !gridSize.columns || gridSize.rows < 1 || gridSize.columns < 1) {
            // display notification
            return;
        }

        const rows: Node[][] = [];
        // used to rerender grid, node ids start at i and increment every node
        let i = randomNumGen(10000);

        // set random start and end points on grid based on grid size
        const startCol = randomNumGen(gridSize.columns);
        const startRow = randomNumGen(gridSize.rows);
        let endCol = randomNumGen(gridSize.columns);
        let endRow = randomNumGen(gridSize.rows);

        if (startCol === endCol && startRow === endRow) {
            endCol = randomNumGen(gridSize.columns);
            endRow = randomNumGen(gridSize.rows);
        }

        for (let x = 0; x < gridSize.rows; x++) {
            let currRow: Node[] = [];

            for (let y = 0; y < gridSize.columns; y++) {
                currRow.push({
                    id: i,
                    col: y,
                    row: x,
                    isStart: y === startCol && x === startRow ? true : false,
                    isEnd: y === endCol && x === endRow ? true : false,
                    isWall: false,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null,
                });

                i++;
            }

            rows.push(currRow);
        }

        setNodes(rows);
    }, [gridSize]);

    useEffect(() => {
        createGrid();
    }, [createGrid, gridSize]);

    return (
        <div className='min-h-screen pb-12 bg-[cornflowerblue]'>
            <TopToolbar
                isSelected={isSelected}
                toggleSelected={toggleSelected}
                startAlgo={startAlgo}
                resetGrid={resetGrid}
                gridSize={gridSize}
                handleGridSizeChange={handleGridSizeChange}
            />
            <div className='flex flex-col items-center justify-center'>
                {/* Create grid display on page */}
                {nodes.map((row: Node[], i: number) => {
                    const topBorder = row[0].row === 0 ? true : false;
                    const botBorder =
                        row[0].row === nodes.length - 1 ? true : false;
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
                                        addToRefs={addToRefs}
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

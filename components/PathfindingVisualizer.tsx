import React, { useState, useEffect, useRef } from 'react';
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

const PathfindingVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<Node[][]>([]);
    const [isSelected, setIsSelected] = useState<string>('');
    const [isMouseDown, setIsMouseDown] = useState(false);
    const nodesRef = useRef<HTMLDivElement[]>(new Array());

    // Selector for toolbar
    const toggleSelected = (button: string): void => {
        if (isSelected === button) {
            setIsSelected('');
        } else {
            setIsSelected(button);
        }
    };

    const animateDijkstra = (visitedNodes: Node[], nodesInShortestPath: Node[]) => {
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
                nodesRef.current.map(nodeElement => {
                    if (nodeElement.id === nodeId && !node.isStart && !node.isEnd) {
                        nodeElement.className += ' bg-purple-500'                        
                    }
                })
                
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPath: Node[]) => {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                const nodeId = String(node.id);
                nodesRef.current.map(nodeElement => {
                    if (nodeElement.id === nodeId && !node.isStart && !node.isEnd) {
                        nodeElement.className = 'w-6 h-6 flex justify-center items-center border-[1px] border-black bg-yellow-500'                        
                    }
                })
            }, 50 * i);
        } 
    }

    // Start Algo
    const startAlgo = (): void => {
        // run the algorithm
        const [visitedNodes, startNode, endNode]: [Node[], Node, Node] = dijkstras(nodes);
        const nodesInShortestPath = getNodesInShortestPath(endNode);
        animateDijkstra(visitedNodes, nodesInShortestPath);
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
        let i = Math.floor(Math.random() * 1000);

        for (let y = 0; y < 20; y++) {
            let currRow: Node[] = [];

            for (let x = 0; x < 50; x++) {
                currRow.push({
                    id: i,
                    col: x,
                    row: y,
                    isStart: y === 8 && x === 10 ? true : false,
                    isEnd: y === 12 && x === 35 ? true : false,
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
    };

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !nodesRef.current.includes(el)) {
            nodesRef.current.push(el);
        }
    }

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
                    const topBorder = row[0].row === 0 ? true : false;
                    const botBorder = row[0].row === nodes.length - 1 ? true : false;
                    return (
                        <div
                            key={i}
                            className='flex flex-row items-center justify-center'
                        >
                            {row.map((node: Node) => {
                                const leftBorder = node.col === 0 ? true : false;
                                const rightBorder = node.col === row.length - 1 ? true : false;
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

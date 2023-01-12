interface Node {
    id: number;
    col: number;
    row: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isWeight: boolean;
    isVisited: boolean;
    distance: number;
    prevNode: Node | null;
    customStyles: string;
}

export const dijkstras = (grid: Node[][]): [Node[], Node] => {
    const visitedNodesInOrder: Node[] = [];
    const [unvisitedNodes, startNode, endNode]: [Node[], Node, Node] = getAllNodes(grid);
    startNode.distance = 0;

    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

        const closestNode: Node = unvisitedNodes.shift()!;

        if (closestNode.isWall) {
            continue;
        }

        // in an endless loop, break out - not possible to get to end point
        if (closestNode.distance === Infinity) {
            break;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === endNode) {
            break;
        }

        updateUnvisitedNeighbors(closestNode, grid);
    }

    return [visitedNodesInOrder, endNode];
};

const getAllNodes = (grid: Node[][]): [Node[], Node, Node] => {
    const nodes: Node[] = [];
    let startNode = <Node>{};
    let endNode = <Node>{};

    for (const row of grid) {
        for (const node of row) {
            if (node.isStart) {
                startNode = node;
            }
            if (node.isEnd) {
                endNode = node;
            }
            nodes.push(node);
        }
    }

    return [nodes, startNode, endNode];
}

const updateUnvisitedNeighbors = (node: Node, grid: Node[][]) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbors) {
        const tempDistance = node.distance + (neighbor.isWeight ? 1 : 0);

        if (tempDistance < neighbor.distance) {
            neighbor.distance = tempDistance + 1;
            neighbor.prevNode = node;
        }
    }
}

const getUnvisitedNeighbors = (node: Node, grid: Node[][]) => {
    const neighbors = [];
    const {row, col} = node;

    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export const getNodesInShortestPath = (endNode: Node) => {
    const nodesInShortestPathOrder = [];
    let currNode: Node | null = endNode;

    while (currNode !== null) {
        nodesInShortestPathOrder.unshift(currNode);
        currNode = currNode.prevNode;
    }

    return nodesInShortestPathOrder;
}
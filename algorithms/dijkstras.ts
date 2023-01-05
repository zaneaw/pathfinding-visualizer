
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

export const dijkstras = (grid: Node[][], startNode: Node, endNode: Node) => {
    const visitedNodes = [];

    startNode.distance = 0;
}
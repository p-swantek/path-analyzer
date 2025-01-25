
export type NodeState = 'unvisited' | 'visited' | 'blocked' | 'traveled';

export interface GridNodeModel{
  x: number;
  y: number;
  nodeState: NodeState;
  key: () => string;
}

export interface PathResult{
  visited: GridNodeModel[];
  shortestPath: GridNodeModel[];
}


export interface PathFindAlgorithm{
  name: string;
  generatePath(start: GridNodeModel, end: GridNodeModel, grid: GridNodeModel[][]): PathResult;
}

export const DIRECTIONS: number[][] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
]

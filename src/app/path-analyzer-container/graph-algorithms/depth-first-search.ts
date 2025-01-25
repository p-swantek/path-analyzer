import { DIRECTIONS, GridNodeModel, PathFindAlgorithm, PathResult } from "../models";
import { createMatrix, generateTravelPath, isContainedInGrid } from "../utils";

export class DepthFirstSearch implements PathFindAlgorithm{
  name: string = 'Depth First Search';

  generatePath(start: GridNodeModel, end: GridNodeModel, grid: GridNodeModel[][]): PathResult {
    let visited: boolean[][] = createMatrix(grid.length, grid[0].length, false);


    let q: GridNodeModel[] = [];
    let parentMap: Map<string, GridNodeModel> = new Map();
    let visitedNodes: GridNodeModel[] = [];
    let path: GridNodeModel[] = [];


    q.push(grid[start.x][start.y]);

    while (q.length > 0) {
      let currentPoint = q.pop();
      visitedNodes.push(currentPoint);
      visited[currentPoint.x][currentPoint.y] = true;

      if (currentPoint.x === end.x && currentPoint.y === end.y) {
        path = generateTravelPath(currentPoint, parentMap);
        break;
      }

      for (let dir of DIRECTIONS) {
        let nX = currentPoint.x + dir[0];
        let nY = currentPoint.y + dir[1];
        if (isContainedInGrid(nX, nY, grid) && !visited[nX][nY] && grid[nX][nY].nodeState !== 'blocked') {
          let nextPoint = grid[nX][nY];
          q.push(nextPoint);
          let nextPointKey = nextPoint.key();
          parentMap.set(nextPointKey,  currentPoint);
        }

      }
    }

    return {
      visited: visitedNodes,
      shortestPath: path
    };
  }
}

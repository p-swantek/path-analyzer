import { concatMap, from, interval, map, OperatorFunction, switchMap, take } from "rxjs";
import { GridNodeModel } from "./models";

export function isContainedInGrid(x: number, y: number, grid: GridNodeModel[][]): boolean {
  let contained = x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
  return contained;
}


export function createMatrix<T>(rows: number, columns: number, fillValue: T): T[][] {
  return new Array(rows)
    .fill(false)
    .map(() => new Array(columns).fill(fillValue));
}

export function toStream(emissionInterval: number = 100): OperatorFunction<GridNodeModel[], GridNodeModel> {
  return source => source.pipe(
    switchMap(points => from(points).pipe(

      concatMap(p => interval(emissionInterval).pipe(
        take(1),
        map(() => p))
      )
    ))
  )
}

export function generateTravelPath(endingPoint: GridNodeModel, pointParentMap: Map<string, GridNodeModel>): GridNodeModel[] {
  let res = [endingPoint]
  let node = pointParentMap.get(endingPoint.key());
  while (node) {
    res.push(node);
    node = pointParentMap.get(node.key());
  }
  return res;
}


export function generateDefaultGridState(rows: number, columns: number): GridNodeModel[][] {

  let nodeModels: GridNodeModel[][] = [];
  for (let i = 0; i < rows; i++) {
    let row: GridNodeModel[] = [];
    for (let j = 0; j < columns; j++) {
      let n: GridNodeModel = {
        x: i,
        y: j,
        nodeState: (Math.floor(Math.random() * (100 - 1 + 1)) + 1) > 15 ? 'unvisited' : 'blocked',
        key: () => `${i},${j}`,
      }
      row.push(n);
    }

    nodeModels.push(row);
  }
  return nodeModels;

}

export function getRandomCooridinate(grid: GridNodeModel[][]): [number, number]{
  let randX = Math.floor(Math.random() * (grid.length - 1));
  let randY = Math.floor(Math.random() * (grid[0].length - 1));
  return [randX, randY];
}


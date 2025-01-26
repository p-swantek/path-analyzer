import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of, scan, startWith, Subject, switchMap, takeLast, tap } from 'rxjs';
import { DepthFirstSearch } from './graph-algorithms/depth-first-search';
import { GridComponent } from "./grid/grid.component";
import { GridNodeModel, PathFindAlgorithm } from './models';
import { generateDefaultGridState, getRandomCooridinate, toStream } from './utils';

@Component({
  selector: 'app-path-analyzer-container',
  imports: [GridComponent, AsyncPipe],
  templateUrl: './path-analyzer-container.component.html',
  styleUrl: './path-analyzer-container.component.scss'
})
export class PathAnalyzerContainerComponent implements OnInit {

  private algorithm: PathFindAlgorithm = new DepthFirstSearch();//new BreadthFirstSearch();
  // private algorithm: PathFindAlgorithm = new BreadthFirstSearch();

  visitedNum: Subject<number> = new Subject();
  visitedNum$: Observable<number> = this.visitedNum.asObservable().pipe(
    scan((prev, curr) => prev + curr, 0)
  );

  traveledNum: Subject<number> = new Subject();
  traveledNum$: Observable<number> = this.traveledNum.asObservable().pipe(
    scan((prev, curr) => prev + curr, 0),
    startWith(0)
  );


  nodeModels: GridNodeModel[][];
  start: GridNodeModel;
  end: GridNodeModel;

  ngOnInit(): void {

    this.nodeModels = generateDefaultGridState(50, 50);
    let [x, y] = getRandomCooridinate(this.nodeModels);
    this.start = this.nodeModels[x][y];


    [x, y] = getRandomCooridinate(this.nodeModels);
    while (this.start.x == x && this.start.y === y){
      [x, y] = getRandomCooridinate(this.nodeModels);
    }

    this.end = this.nodeModels[x][y];
    this.start.nodeState = 'unvisited';
    this.end.nodeState = 'unvisited';

    let result = this.algorithm.generatePath(this.start, this.end, this.nodeModels);


    of(result.visited).pipe(
      toStream(10),
      tap(p => this.nodeModels[p.x][p.y] = { ...p, nodeState: 'visited' }),
      tap(() => this.visitedNum.next(1)),
      takeLast(1),
      switchMap(() => of(result.shortestPath)),
      toStream(10),
      tap(p => this.nodeModels[p.x][p.y] = { ...p, nodeState: 'traveled' }),
      tap(() => this.traveledNum.next(1))
    ).subscribe();


  }

  updateNodeBlockedState(node: GridNodeModel, isBlocked: boolean): void{
    let existing = this.nodeModels[node.x][node.y];
    existing = {
      ...existing,
      nodeState: isBlocked ? 'blocked' : 'unvisited'
    };
    this.nodeModels[node.x][node.y] = existing;
  }



}

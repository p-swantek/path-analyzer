import { Component, OnInit } from '@angular/core';
import { GridComponent } from "./grid/grid.component";
import { Subject, of, tap } from 'rxjs';
import { BreadthFirstSearch } from './graph-algorithms/breadth-first-search';
import { GridNodeModel, PathFindAlgorithm } from './models';
import { generateDefaultGridState, toStream } from './utils';
import { DepthFirstSearch } from './graph-algorithms/depth-first-search';

@Component({
  selector: 'app-path-analyzer-container',
  imports: [GridComponent],
  templateUrl: './path-analyzer-container.component.html',
  styleUrl: './path-analyzer-container.component.scss'
})
export class PathAnalyzerContainerComponent implements OnInit {

  private algorithm: PathFindAlgorithm = new DepthFirstSearch();//new BreadthFirstSearch();

  nodeModels: GridNodeModel[][];
  start: GridNodeModel;
  end: GridNodeModel;

  ngOnInit(): void {

    this.nodeModels = generateDefaultGridState(50, 50);
    this.start = this.nodeModels[4][45];
    this.end = this.nodeModels[37][25];

    let result = this.algorithm.generatePath(this.start, this.end, this.nodeModels);

    let completed = new Subject<GridNodeModel[]>();

    of(result.visited).pipe(
      toStream(1),
      tap(point => this.nodeModels[point.x][point.y] = { ...this.nodeModels[point.x][point.y], nodeState: 'visited' })
    ).subscribe({
      complete: () => completed.next(result.shortestPath)
    });

    completed.pipe(
      toStream(),
      tap(p => this.nodeModels[p.x][p.y] = { ...this.nodeModels[p.x][p.y], nodeState: 'traveled' })
    ).subscribe()

  }



}

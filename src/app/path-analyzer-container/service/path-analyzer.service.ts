import { Injectable } from '@angular/core';
import { GridNodeModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PathAnalyzerService {

  private selectedAlgorithm: Algorithm;
  private gridState: GridNodeModel[][];


}

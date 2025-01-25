import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { GridNodeModel } from '../models';

@Component({
  selector: 'app-grid',
  imports: [NgStyle],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  nodeModels = input<GridNodeModel[][]>();
  start = input<GridNodeModel>();
  end = input<GridNodeModel>();
}

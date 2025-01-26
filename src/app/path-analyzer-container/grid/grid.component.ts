import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { GridNodeModel } from '../models';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-grid',
  imports: [NgStyle, MatMenuModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  nodeModels = input<GridNodeModel[][]>();
  start = input<GridNodeModel>();
  end = input<GridNodeModel>();

  nodeBlocked = output<GridNodeModel>();
  nodeUnblocked = output<GridNodeModel>();

}

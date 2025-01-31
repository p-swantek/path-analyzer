import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, HostListener, inject, input, NgZone, OnInit, output, OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';

import { GridNodeModel } from '../models';
import { MatMenuModule } from '@angular/material/menu';
import { fromEvent, map, merge, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-grid',
  imports: [NgStyle, MatMenuModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent{
  protected mouseOverSubject = new Subject<GridNodeModel>();
  protected mouseIsDown = new Subject<void>();
  protected mouseIsUp = new Subject<void>();



  nodeModels = input<GridNodeModel[][]>();
  start = input<GridNodeModel>();
  end = input<GridNodeModel>();

  nodeBlocked = output<GridNodeModel>();
  nodeUnblocked = output<GridNodeModel>();
  mouseDownNodes = outputFromObservable(
    this.mouseIsDown.pipe(
      switchMap(() => this.mouseOverSubject.asObservable().pipe(takeUntil(this.mouseIsUp)))
    )
  )


  @HostListener('mousedown')
  onMouseDown(): void{
    this.mouseIsDown.next();
  }

  @HostListener('mouseup')
  onMouseUp(): void{
    this.mouseIsUp.next();
  }



}

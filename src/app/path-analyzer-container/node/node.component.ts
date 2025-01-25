import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, computed, input } from '@angular/core';
import { GridNodeModel } from '../models';


/**
 * @deprecated
 */
@Component({
  selector: 'app-node',
  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  // animations: [
  //   trigger('nodeState', [
  //     state('unvisited', style({
  //       backgroundColor: 'blue'
  //     })),
  //     state('blocked', style({
  //       backgroundColor: 'black'
  //     })),
  //     state('visited', style({
  //       backgroundColor: 'yellow'
  //     })),
  //     state('traveled', style({
  //       backgroundColor: 'green'
  //     })),
  //     transition('unvisited => visited', [
  //       animate('0.2s 100ms ease-in')
  //     ]),
  //     transition('visited => unvisited', [
  //       animate('0.5s 100ms ease-in')
  //     ]),
  //     transition('visited => traveled', [
  //       animate('0.5s 100ms ease-in')
  //     ])
  //   ])
  // ]
})
export class NodeComponent {

  node = input<GridNodeModel>();
  traveled = input<boolean>();
  computedTransition = computed(() => {
    let state = this.node().nodeState;
    return state;
  })

}

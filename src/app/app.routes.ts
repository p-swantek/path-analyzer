import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'path-analyzer',
    loadComponent: () => import('./path-analyzer-container/path-analyzer-container.component').then(m => m.PathAnalyzerContainerComponent)
  },
  {
    path: '',
    redirectTo: 'path-analyzer',
    pathMatch: 'full'
  }
];

import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'another',
    loadComponent: () => import('./another/another.component').then((m) => m.AnotherComponent),
  },
];

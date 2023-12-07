import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./pages/invoices/invoices.routes')
  },
  {
    path: '**',
    redirectTo: '/invoices'
  }
];

import {Routes} from '@angular/router';
import {DemoAccordionComponent} from "./pages/demo-accordion.component";
import {routes as highlightRoutes} from "./pages/demo-highlight.component";
import {routes as httpRoutes} from "./pages/demo-http.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/demo-accordion',
    pathMatch: 'full'
  },
  {
    path: 'demo-accordion',
    component: DemoAccordionComponent
  },
  // Not Lazy Loading
  {
    path: 'demo-highlight',
    loadChildren: () => highlightRoutes
  },
  // Lazy Loading
  {
    path: 'demo-forms',
    loadChildren: () => import('./modules/demo-forms/demo-forms.module').then(m => m.DemoFormsModule),
  },
  {
    path: 'demo-http',
    loadChildren: () => httpRoutes,
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

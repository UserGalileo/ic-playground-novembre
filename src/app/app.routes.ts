import { Routes } from '@angular/router';
import {DemoAccordionComponent} from "./pages/demo-accordion.component";
import {routes as highlightRoutes} from "./pages/demo-highlight.component";
import {DemoFormsModule} from "./modules/demo-forms/demo-forms.module";

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
  // Not Lazy Loading
  {
    path: 'demo-forms',
    loadChildren: () => DemoFormsModule
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

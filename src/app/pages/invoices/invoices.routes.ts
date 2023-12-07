import {Routes} from "@angular/router";
import {InvoicesComponent} from "./invoices.component";
import {InvoiceComponent} from "./invoice.component";

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: ':id',
        component: InvoiceComponent,
        canDeactivate: [(c: InvoiceComponent) => c.canDeactivate()]
      }
    ]
  }
];

export default routes;

import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {InvoicesStore} from "./invoices.store";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="invoices-container">
      <div class="invoice-list">
        <h3>Invoices</h3>
        <ul>
          <li *ngFor="let invoice of store.invoices()">
            <a
              class="invoice-list-item"
              [routerLink]="'/invoices/' + invoice.id"
              routerLinkActive="active"
            >{{ invoice.subject || 'New invoice' }}</a>
          </li>
        </ul>
        <button (click)="store.createInvoice()">New invoice</button>
      </div>
      <div class="invoice-edit">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  providers: [InvoicesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicesComponent {

  store = inject(InvoicesStore);

  ngOnInit() {
    this.store.loadInvoices();
  }
}

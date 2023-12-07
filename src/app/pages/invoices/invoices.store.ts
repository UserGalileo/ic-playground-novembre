import {inject, Injectable, signal} from "@angular/core";
import {InvoicesService} from "../../api/services/invoices.service";
import {ClientsService} from "../../api/services/clients.service";
import {Client, Invoice} from "../../api/models";
import {finalize, forkJoin, tap} from "rxjs";

@Injectable()
export class InvoicesStore {

  // Deps
  invoicesService = inject(InvoicesService);
  clientsService = inject(ClientsService);

  // States
  invoices = signal<Invoice[]>([]);
  clients = signal<Client[]>([]);
  loading = signal(false);

  loadInvoices() {
    this.loading.set(true);
    forkJoin([
      this.invoicesService.loadInvoices(),
      this.clientsService.loadClients()
    ]).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(([invoices, clients]) => {
      this.invoices.set(invoices);
      this.clients.set(clients);
    })
  }

  createInvoice() {
    this.invoicesService.addInvoice({
      subject: '',
      total: 0,
      items: []
    }).subscribe(invoice => {
      this.invoices.update(invoices => [...invoices, invoice]);
    })
  }

  // Update Pessimistico
  saveInvoice(invoice: Invoice) {
    this.invoicesService.editInvoice(invoice).subscribe(newInvoice => {
      this.invoices.update(invoices => invoices.map(i => i.id === invoice.id ? newInvoice : i))
    })
  }

  // Update Ottimistico
  deleteInvoice(id: string) {
    const index = this.invoices().findIndex(invoice => invoice.id === id);
    const deleted = this.invoices()[index]!;
    this.invoices.update(invoices => invoices.filter(i => i.id !== id));
    this.invoicesService.deleteInvoice(id).subscribe({
      error: () => {
        this.invoices.update(invoices => [ ...invoices.slice(0, index), deleted, ...invoices.slice(index) ]);
      }
    })
  }

}

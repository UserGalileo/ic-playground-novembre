import {ChangeDetectionStrategy, Component, computed, effect, inject, Input, signal} from "@angular/core";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {InvoicesStore} from "./invoices.store";
import {Router} from "@angular/router";
import {filter, map, pairwise} from "rxjs";
import {InvoiceItem} from "../../api/models";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";

type InvoiceItemGroup = FormGroup<{
  text: FormControl<string>;
  price: FormControl<number>;
}>

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="invoice-header">Invoice</h1>

    <form [formGroup]="form" (ngSubmit)="saveInvoice()">

      <label>
        <span>Subject</span>
        <input type="text" formControlName="subject">
      </label>

      <label>
        <span>Client</span>
        <select formControlName="clientId">
          <option value="">-</option>
          <option *ngFor="let client of store.clients()"  [value]="client.id">
            {{ client.name }}
          </option>
        </select>
      </label>

      <div formArrayName="items">
        <div
          *ngFor="let item of form.controls.items.controls; let i = index"
          [formGroupName]="i"
          class="invoice-item"
        >
          <input type="text" formControlName="text" placeholder="Item">
          <input type="number" formControlName="price" placeholder="Price">
          <button type="button" class="btn-danger" (click)="removeItem(i)">Remove</button>
        </div>
        <button type="button" (click)="addItem()">New item</button>
      </div>
      <h2 class="invoice-total">Total: €{{ total$ | async }}</h2>
      <button [attr.aria-disabled]="!form.valid || null">Save</button>
      <button type="button" (click)="deleteInvoice()" class="btn-danger">Delete</button>
    </form>
  `
})
export class InvoiceComponent {

  fb = inject(NonNullableFormBuilder);
  store = inject(InvoicesStore);
  router = inject(Router);

  invoiceId = signal<string | null>(null);

  @Input() set id(id: string) {
    this.invoiceId.set(id);
  }

  currentInvoice = computed(() => {
    return this.store.invoices().find(invoice => invoice.id === this.invoiceId());
  }, {
    equal: (a, b) => a?.id === b?.id
  });

  form = this.fb.group({
    id: ['', Validators.required],
    clientId: ['', Validators.required],
    subject: ['', Validators.required],
    items: this.fb.array([] as InvoiceItemGroup[])
  });

  total$ = this.form.valueChanges.pipe(
    map(() => this.calculateTotal(this.form.getRawValue().items))
  );

  hasUnsavedChanges = true;

  constructor() {
    effect(() => {
      const invoice = this.currentInvoice();
      this.hasUnsavedChanges = false;
      if (invoice) {
        this.form.controls.items.clear({ emitEvent: false });

        invoice.items.forEach(() => {
          this.addItem(false);
        });

        this.form.reset(invoice);
      }
    });

    this.form.valueChanges.pipe(
      pairwise(),
      filter(([a, b]) => a.id === b.id),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.hasUnsavedChanges = true;
    });

    toObservable(this.currentInvoice).subscribe(() => {
      this.hasUnsavedChanges = false;
    });
  }

  saveInvoice() {
    if (this.form.valid) {
      this.hasUnsavedChanges = false;
      this.store.saveInvoice({
        ...this.form.getRawValue(),
        total: this.calculateTotal(this.form.getRawValue().items),
        id: this.invoiceId()!
      });
    }
  }

  createItem() {
    return this.fb.group({
      text: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  addItem(emitEvent = true) {
    this.form.controls.items.push(this.createItem(), {
      emitEvent
    });
  }

  removeItem(i: number) {
    this.form.controls.items.removeAt(i);
  }

  deleteInvoice() {
    this.store.deleteInvoice(this.invoiceId()!);
    this.router.navigateByUrl('/invoices');
  }

  calculateTotal(items: InvoiceItem[]) {
    return items.reduce((total, item) => total + item.price, 0);
  }

  canDeactivate() {
    if (this.hasUnsavedChanges) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}

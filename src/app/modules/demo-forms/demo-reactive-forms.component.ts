import {Component, inject} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {forbidden, forbiddenAsync, forbiddenPair} from "./validators";

type Gender = 'M' | 'F' | null;

@Component({
  selector: 'app-demo-reactive-forms',
  template: `
    <form [formGroup]="profile" (ngSubmit)="onSubmit()">
      <h3>Profile</h3>
      <input formControlName="firstName" type="text">
      <input formControlName="lastName" type="text">

      <select formControlName="gender">
        <option value="M">M</option>
        <option value="F">F</option>
        <option [ngValue]="null">Other</option>
      </select>

      <app-counter formControlName="count" />

        <app-address formControlName="address" />

        <ng-container formArrayName="phones">
        <h4>Phones</h4>

        <div *ngFor="let phone of profile.controls.phones.controls; let i = index">
          <input [formControlName]="i" type="text"> <button (click)="removePhone(i)">remove</button>
        </div>

        <button type="button" (click)="addPhone()">Add</button>
      </ng-container>


      <br><button [disabled]="!profile.valid">Invia</button>
    </form>
    <hr>
    Status: {{ profile.status }}
    <hr>
    UI Status: <br>
    Dirty: {{ profile.dirty }} <br>
    Pristine: {{ profile.pristine }} <br>
    Touched: {{ profile.touched }} <br>
    Untouched: {{ profile.untouched }} <br>
    Form errors: {{ profile.errors | json }}
  `
})
export class DemoReactiveFormsComponent {

  fb = inject(FormBuilder);

  profile = this.fb.group({
    firstName: ['Michele', forbidden('Michele'), forbiddenAsync('Fabio')],
    lastName: ['Stieven', forbidden('Stieven')],
    gender: ['M' as Gender],
    count: [0],
    address:  [{
      city:'',
      street: '',
      nr: '',
    }],
    phones: this.fb.array<string>([])
  }, {
    validators: forbiddenPair('Mario', 'Rossi')
  });

  ngOnInit() {
    // Observable
    this.profile.valueChanges.subscribe(value => {
      console.log(value)
    });

    setTimeout(() => {
      this.profile.controls.address.setValue({
        city: 'Bassano del Grappa',
        street: '...',
        nr: '...'
      })
      // this.profile.controls.address.disable()
    }, 2000)
  }

  onSubmit() {}

  addPhone() {
    const phones = this.profile.controls.phones;
    phones.push(this.fb.control(''));
  }

  removePhone(i: number) {
    this.profile.controls.phones.removeAt(i);
  }
}

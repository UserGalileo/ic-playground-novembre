import {Component, inject} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-demo-reactive-forms',
  template: `
    <form [formGroup]="profile" (ngSubmit)="onSubmit()">
      <h3>Profile</h3>
      <input formControlName="firstName" type="text">
      <input formControlName="lastName" type="text">

      <ng-container formGroupName="address">
        <h4>Address</h4>

        <input formControlName="city" type="text">
        <input formControlName="street" type="text">
        <input formControlName="nr" type="text">
      </ng-container>

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
  `
})
export class DemoReactiveFormsComponent {

  fb = inject(FormBuilder);

  profile = this.fb.group({
    firstName: ['Michele', [Validators.required, Validators.minLength(3)]],
    lastName: ['Stieven'],
    address: this.fb.group({
      city:'',
      street: '',
      nr: '',
    }),
    phones: this.fb.array<string>([])
  });

  ngOnInit() {
    // Observable
    this.profile.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  onSubmit() {
    console.log(this.profile.value);
  }

  addPhone() {
    const phones = this.profile.controls.phones;
    phones.push(this.fb.control(''));
  }

  removePhone(i: number) {
    this.profile.controls.phones.removeAt(i);
  }
}

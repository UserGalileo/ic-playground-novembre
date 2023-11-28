import {Component, ViewChild} from "@angular/core";
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-demo-template-forms',
  template: `
    <form #profileForm="ngForm" (ngSubmit)="onSubmit(profileForm.form)">
      <h3>Profile</h3>
      <input type="text" [(ngModel)]="profile.firstName" name="firstName" forbidden="Michele" forbiddenAsync="Fabio">
      <input type="text" [(ngModel)]="profile.lastName" name="lastName">

      <select [(ngModel)]="profile.gender" name="gender">
        <option value="M">M</option>
        <option value="F">F</option>
        <option [ngValue]="null">Other</option>
      </select>

      <app-counter [(ngModel)]="profile.count" name="count" />

      <ng-container ngModelGroup="address">
        <h4>Address</h4>

        <input type="text" [(ngModel)]="profile.address.city" name="city">
        <input type="text" [(ngModel)]="profile.address.street" name="street">
        <input type="text" [(ngModel)]="profile.address.nr" name="nr">
      </ng-container>

      <br>
      <button>Submit</button>

    </form>
    <hr>
    Status: {{ profileForm.status }}
    <hr>
    UI Status: <br>
    Dirty: {{ profileForm.dirty }} <br>
    Pristine: {{ profileForm.pristine }} <br>
    Touched: {{ profileForm.touched }} <br>
    Untouched: {{ profileForm.untouched }} <br>
  `
})
export class DemoTemplateFormsComponent {

  // Necessario se vogliamo utilizzare gli Observable
  @ViewChild(NgForm) ngForm: NgForm | undefined;

  profile = {
    firstName: 'Michele',
    lastName: 'Stieven',
    gender: 'M',
    count: 0,
    address: {
      city: '',
      street: '',
      nr: ''
    },
  }

  ngAfterViewInit() {
    this.ngForm!.form.valueChanges.subscribe(() => {})
  }

  onSubmit(form: FormGroup<any>) {
    console.log(this.ngForm?.form.value);
  }

}

import {Component} from "@angular/core";

@Component({
  selector: 'app-demo-template-forms',
  template: `
    <form #profileForm="ngForm">
      <input type="text" [(ngModel)]="profile.firstName" name="firstName">
      <input type="text" [(ngModel)]="profile.lastName" name="lastName">
    </form>

    {{ profileForm.value | json }}
  `
})
export class DemoTemplateFormsComponent {

  profile = {
    firstName: 'Michele',
    lastName: 'Stieven'
  }

}

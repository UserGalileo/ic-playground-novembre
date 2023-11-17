import {Component} from "@angular/core";

@Component({
  selector: 'app-demo-forms',
  template: `
    <a routerLink="reactive">Reactive</a> |
    <a routerLink="template">Template</a>

    <hr>
    <router-outlet></router-outlet>
  `
})
export class DemoFormsComponent {
}

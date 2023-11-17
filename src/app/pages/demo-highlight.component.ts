import {Component} from "@angular/core";
import {UnlessDirective} from "../directives/unless.directive";
import {HighlightDirective} from "../directives/highlight.directive";
import {RouterOutlet, Routes} from "@angular/router";

@Component({
  selector: 'app-demo-highlight',
  standalone: true,
  imports: [
    UnlessDirective,
    HighlightDirective,
  ],
  template: `
    <p *unless="false">Hello?</p>

    <input type="radio" name="colors" (click)="color = 'red'">Red
    <input type="radio" name="colors" (click)="color = 'green'">Green
    <input type="radio" name="colors" (click)="color = 'blue'">Blue

    <h1 [highlight]="color">highlight</h1>
  `,
})
export class DemoHighlightComponent {
  color = '';
}

export const routes: Routes = [
  {
    path: '',
    component: DemoHighlightComponent
  }
]

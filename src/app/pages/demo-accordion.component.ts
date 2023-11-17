import {Component} from "@angular/core";
import {AccordionComponent} from "../components/accordion.component";
import {PanelComponent} from "../components/panel.component";

@Component({
  selector: 'app-demo-accordion',
  standalone: true,
  imports: [
    AccordionComponent,
    PanelComponent
  ],
  template: `
    <app-accordion>
      <app-panel title="Titolo 1">Contenuto 1</app-panel>
      <app-panel title="Titolo 2">Contenuto 2</app-panel>
      <app-panel title="Titolo 3">Contenuto 3</app-panel>
    </app-accordion>
  `
})
export class DemoAccordionComponent {

}

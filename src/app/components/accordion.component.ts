import {Component, ContentChildren, QueryList} from "@angular/core";
import {PanelComponent} from "./panel.component";

@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class AccordionComponent {

  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent> | undefined;

  // TODO: Da migliorare!
  // Problema 1) Se i panel cambiano a runtime, non c'è effetto
  // Problema 2) Gestire l'unsubscribe
  ngAfterContentInit() {
    this.panels?.forEach((panel, index) => {
      panel.toggle.subscribe(isToggled => {
        if (isToggled) {
          this.panels?.forEach((p, i) => {
            if (index !== i) {
              p.isVisible = false;
            }
          })
        }
      })
    })
  }
}

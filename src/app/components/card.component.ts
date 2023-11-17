import {Component, Input} from "@angular/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="header" (click)="isBodyVisible = !isBodyVisible">
      {{ header }}
    </div>
    <div class="body" *ngIf="isBodyVisible">
      <ng-content />
    </div>
  `,
  styles: [`
    :host {
      background: rgba(0, 0, 0, .2);
      padding: 5px;
      display: block;
      border-radius: 6px;
    }

    .header {
      border: 2px solid black;
      border-radius: 6px;
      cursor: pointer;
    }
  `],
})
export class CardComponent {
  @Input() header = '';
  isBodyVisible = true;
}

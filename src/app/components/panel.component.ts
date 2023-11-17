import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="panel">
      <strong (click)="onClick()">{{ title }}</strong>
      <div *ngIf="isVisible" class="body"><ng-content></ng-content></div>
    </div>
  `,
  styles: [`
    strong {
      cursor: pointer;
      padding: .5em 0;
      display: block;
    }
    .panel {
      padding: .5em;
      border-radius: 10px;
      border: 1px solid rgba(0,0,0,.3);
    }
  `]
})
export class PanelComponent {

  @Input({ required: true }) title = '';
  @Output() toggle = new EventEmitter<boolean>();

  isVisible = false;

  onClick() {
    this.isVisible = !this.isVisible;
    this.toggle.emit(this.isVisible);
  }
}

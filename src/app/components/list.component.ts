import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() items: any[] = [];
}

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TodosFilter} from "../../models";

@Component({
  selector: 'app-todos-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <select
      [ngModel]="filter"
      (ngModelChange)="filterChange.emit($event)"
    >
      <option value="ALL">All</option>
      <option value="ACTIVE">Active</option>
      <option value="COMPLETED">Completed</option>
    </select>
  `
})
export class TodosFilterComponent {
  @Input({ required: true }) filter!: TodosFilter;
  @Output() filterChange = new EventEmitter();
}

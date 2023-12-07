import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Todo} from "../../models";

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        {{ todo.text }}
        <input
          type="checkbox"
          [ngModel]="todo.completed"
          (ngModelChange)="toggleTodo.emit(todo.id)"
        >
        <button
          (click)="deleteTodo.emit(todo.id)"
        >delete</button>
      </li>
    </ul>
  `
})
export class TodosListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggleTodo = new EventEmitter<string>();
  @Output() deleteTodo = new EventEmitter<string>();
}

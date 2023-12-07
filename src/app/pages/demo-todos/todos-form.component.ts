import {Component, EventEmitter, Output, signal} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todos-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input type="text" name="newTodo" [ngModel]="newTodo()" (ngModelChange)="newTodo.set($event)">
    </form>
  `
})
export class TodosFormComponent {
  newTodo = signal('');

  @Output() addTodo = new EventEmitter<string>();

  onSubmit() {
    this.addTodo.emit(this.newTodo());
    this.newTodo.set('')
  }
}

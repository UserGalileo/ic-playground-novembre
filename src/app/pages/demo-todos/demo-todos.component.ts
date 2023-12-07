import {Component, computed, inject, signal} from "@angular/core";
import {Routes} from "@angular/router";
import {Todo, TodosFilter} from "../../models";
import {TodosFormComponent} from "./todos-form.component";
import {TodosFilterComponent} from "./todos-filter.component";
import {TodosListComponent} from "./todos-list.component";
import {TodosService} from "../../services/todos.service";
import {concatMap, Subject, switchMap, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    TodosFormComponent,
    TodosFilterComponent,
    TodosListComponent
  ],
  template: `
    <app-todos-form
      (addTodo)="addTodo$.next($event)"
    />
    <app-todos-filter
      [filter]="filter()"
      (filterChange)="filter.set($event)"
    />
    <app-todos-list
      [todos]="filteredTodos()"
      (toggleTodo)="toggleTodo$.next($event)"
      (deleteTodo)="deleteTodo$.next($event)"
    />
  `
})
export class DemoTodosComponent {

  // Dipendenze
  todosService = inject(TodosService);

  // Stati
  filter = signal<TodosFilter>('ALL');
  todos = signal<Todo[]>([]);

  // Stati derivati
  filteredTodos = computed(() => {
    if (this.filter() === 'ACTIVE') {
      return this.todos().filter(t => !t.completed);
    }
    if (this.filter() === 'COMPLETED') {
      return this.todos().filter(t => t.completed);
    }
    return this.todos();
  });

  // Eventi
  toggleTodo$ = new Subject<string>();
  deleteTodo$ = new Subject<string>();
  addTodo$ = new Subject<string>();

  // Effetti
  constructor() {
    // Pessimistic Update
    this.toggleTodo$.pipe(
      switchMap(id => this.todosService.toggleTodo(id)),
      takeUntilDestroyed()
    ).subscribe(todo => {
      this.todos.update(todos => todos.map(t => t.id === todo.id ? todo : t))
    });

    // Optimistic Update
    this.deleteTodo$.pipe(
      tap(id => this.todos.update(todos => todos.filter(todo => id !== todo.id))),
      concatMap(id => this.todosService.deleteTodo(id)),
      takeUntilDestroyed()
    ).subscribe();

    // Optimistic Update
    this.addTodo$.pipe(
      concatMap(text => {
        const newTodo: Todo = {
          id: '' + Math.random(),
          text,
          completed: false
        }
        this.todos.update(todos => [...todos, newTodo]);
        return this.todosService.addTodo(newTodo);
      }),
      takeUntilDestroyed()
    ).subscribe()
  }

  // Hook
  ngOnInit() {
    this.todosService.getAll().subscribe(todos => {
      this.todos.set(todos);
    })
  }

  // Metodi
}

export const routes: Routes = [
  {
    path: '',
    component: DemoTodosComponent
  }
]

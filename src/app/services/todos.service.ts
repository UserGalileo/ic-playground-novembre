import {inject, Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
import {Todo} from "../models";
import {delay, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodosService {

  // http = inject(HttpClient);

  todos = [
    {
      id: '123',
      text: 'prova',
      completed: true
    },
    {
      id: '456',
      text: 'prova2',
      completed: false
    }
  ];

  getAll() {
    // return this.http.get<Todo[]>('/todos');
    return of(this.todos).pipe(
      delay(1000)
    )
  }

  toggleTodo(id: string) {
    this.todos = this.todos.map(todo => {
      if (id === todo.id) {
        return { ...todo , completed: !todo.completed };
      }
      return todo;
    });

    return of(this.todos.find(t => t.id === id)!).pipe(
      delay(1000)
    );
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => id !== todo.id);

    return of(id).pipe(
      delay(1000)
    );
  }

  addTodo(newTodo: Todo) {
    this.todos = [...this.todos, newTodo];

    return of(newTodo).pipe(
      delay(1000)
    );
  }

}

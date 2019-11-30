import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

export interface Todo {
  id: number,
  title: string,
  priority: number,
  completed: boolean,
  deadline?: Date
}

@Injectable({providedIn: "root"})
export class TodosService {

  constructor (private httpClient: HttpClient) {}

  public todos: Todo[] = [];

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id)
  }

  fetchTodos() : Observable<Todo[]> {
    return this.httpClient.get<Todo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .pipe(tap(todos => this.todos = todos))
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

}

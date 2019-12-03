import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

export interface Todo {
  id: number,
  title: string,
  text: string,
  priority: number,
  done: boolean,
  date?: Date
}

const BACKEND_URL = 'http://localhost:4200/api';

@Injectable({providedIn: "root"})
export class TodosService {

  constructor (private httpClient: HttpClient) {}

  public todos: Todo[] = [];
  public isDetailView = false;
  public selectedTodo: Todo = null;

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].done = !this.todos[idx].done;
  }

  removeTodo(id: number) {
    this.httpClient.post(BACKEND_URL + "/delete", {id: id})
      .subscribe(response => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  fetchTodos() : Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(BACKEND_URL + "/get")
      .pipe(tap(todos => this.todos = todos))
  }

  addTodo(todo: Todo) {
    this.httpClient.post(BACKEND_URL + "/save", todo)
      .subscribe(response => {
        this.todos.push(todo);
      });
  }
}

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

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

  readonly priorityList = ['Обычный', 'Срочный', 'Попа в огне'];

  public todos: Todo[] = [];
  public isDetailView = false;
  public selectedTodo: Todo = null;

  constructor (private httpClient: HttpClient) {}

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

  saveTodo(formData: FormGroup) {

    const todo: Todo = {
      id: Date.now(),
      title: formData.get("title").value,
      text: formData.get("text").value,
      priority: formData.get("priority").value,
      date: formData.get("date").value,
      done: false
    };

    this.httpClient.post(BACKEND_URL + "/save", formData.value)
      .subscribe(response => {
         this.todos.push(todo);
      });
  }
}

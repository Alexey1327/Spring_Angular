import {Injectable, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

export interface Todo {
  id: number,
  title: string,
  text: string,
  priority: number,
  done: boolean,
  date?: Date
}

@Injectable({providedIn: "root"})
export class TodosService implements OnInit{

  readonly priorityList = ['Обычный', 'Срочный', 'Попа в огне'];

  public todos: Todo[] = [];
  public isDetailView = false;
  public selectedTodo: Todo = null;
  public isAuthenticated = false;

  private authToken: string;

  constructor (private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].done = !this.todos[idx].done;
  }

  removeTodo(id: number) {
    this.httpClient.request('delete',environment.apiUrl + "/delete", {body: {id: id}})
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  fetchTodos() : Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(environment.apiUrl + "/get")
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

    this.httpClient.post(environment.apiUrl + "/save", formData.value)
      .subscribe(() => {
         this.todos.push(todo);
      });
  }

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(value: string) {
    this.authToken = value;
  }

  setClientAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}

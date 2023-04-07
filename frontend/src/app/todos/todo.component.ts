import {Component, OnInit} from '@angular/core';
import {Todo, TodosService} from "../service/todos.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public loading: boolean = true;
  public searchString = '';

  constructor(public todosService: TodosService) { }

  ngOnInit() {
    this.todosService.fetchTodos()
      .pipe(delay(500))
      .subscribe(() => {
      this.loading = false;
    })
  }

  onChangeCompleted(id: number) {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
  }

  detailView(todo: Todo) {
    this.todosService.isDetailView = true;
    this.todosService.selectedTodo = todo;
  }
}

import { Component, OnInit } from '@angular/core';
import {Todo, TodosService} from "../service/todos.service";

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss']
})
export class TodoAddFormComponent implements OnInit {

  title: string = '';
  text: string = '';
  priority: number = 0;
  date: Date = null;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
  }

  addTodo() {

    const todo: Todo = {
      id: Date.now(),
      title: this.title,
      text: this.text,
      priority: this.priority,
      date: this.date,
      done: false
    };

    this.todosService.addTodo(todo);
    this.title = this.text = this.date = null;
    this.priority = 0;
  }
}

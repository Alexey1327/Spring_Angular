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

  constructor(private todosService: TodosService) { }

  ngOnInit() {
  }

  addTodo() {

    const todo: Todo = {
      id: Date.now(),
      title: this.title,
      text: this.text,
      done: false,
      priority: 0,
      date: new Date()
    };

    this.todosService.addTodo(todo);
  }
}

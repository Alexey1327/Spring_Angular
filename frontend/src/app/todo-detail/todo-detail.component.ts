import { Component, OnInit } from '@angular/core';
import {TodosService} from "../service/todos.service";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  constructor(public todosService: TodosService) { }

  ngOnInit() {
  }

}

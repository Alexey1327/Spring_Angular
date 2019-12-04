import { Component, OnInit } from '@angular/core';
import {Todo, TodosService} from "../service/todos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss']
})
export class TodoAddFormComponent implements OnInit {

  todoForm: FormGroup;
  formInvalid: boolean = false;

  constructor(private todosService: TodosService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  addTodo() {
    if (this.todoForm.invalid) {
      this.formInvalid = true;
      return;
    }

    this.formInvalid = false;
    this.todosService.saveTodo(this.todoForm);
    this.createForm();
  }

  private createForm() {
    this.todoForm = this.formBuilder.group({
      title: [null, Validators.required],
      text: [''],
      priority: ['0'],
      date: [''],
    });
  }
}

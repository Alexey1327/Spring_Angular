import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TodosService} from "../service/todos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-add-form',
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss']
})
export class TodoAddFormComponent implements OnInit {

  todoForm: FormGroup;

  @ViewChild("titleInput", {static: false}) el: ElementRef;

  constructor(private todosService: TodosService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  addTodo() {
    if (this.todoForm.invalid) {
      this.el.nativeElement.focus();
      return;
    }

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

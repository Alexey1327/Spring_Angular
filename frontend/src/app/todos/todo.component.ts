import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../app.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todos: Todo[] = [];
  @Output() onToggle = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onChangeCompleted(id: number) {
    this.onToggle.emit(id);
  }

}

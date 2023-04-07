import { Component } from '@angular/core';
import {TodosService} from "./service/todos.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular + spring demo application';

  constructor(public todosService: TodosService) { }

}

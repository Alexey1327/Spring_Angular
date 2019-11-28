import { Component } from '@angular/core';

export interface Todo {
  id: number,
  title: string,
  priority: number,
  completed: boolean,
  deadline?: Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Angular + spring demo application';

  public todos: Todo[] = [
    {id: 1, title: "Вымыть посуду", priority: 1, completed: false, deadline: new Date("2019-11-28")},
    {id: 2, title: "Вынести мусор", priority: 2, completed: true, deadline: new Date("2019-11-28")},
    {id: 3, title: "Сварить борщ", priority: 3, completed: false, deadline: new Date("2019-11-28")},
    {id: 4, title: "Скачать сериал", priority: 2, completed: true, deadline: new Date("2019-11-28")},
  ];

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
  }

}

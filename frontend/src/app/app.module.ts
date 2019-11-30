import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todos/todo.component';
import {HttpClientModule} from "@angular/common/http";
import { TodoAddFormComponent } from './todo-add-form/todo-add-form.component';
import {FormsModule} from "@angular/forms";
import {TodosFilterPipe} from "./service/todos-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoAddFormComponent,
    TodosFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

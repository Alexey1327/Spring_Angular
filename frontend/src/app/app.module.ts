import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todos/todo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TodoAddFormComponent } from './todo-add-form/todo-add-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodosFilterPipe} from "./service/todos-filter.pipe";
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { AuthComponent } from './auth/auth.component';
import {AuthHttpInterceptor} from "./http-interceptor/auth-http.interceptor";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoAddFormComponent,
    TodosFilterPipe,
    TodoDetailComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptor, multi:true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

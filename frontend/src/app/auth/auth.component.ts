import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosService} from "../service/todos.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(private todosService: TodosService, private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  authUser() {
    this.httpClient.post(environment.apiUrl + "/authenticate", this.authForm.value, {responseType: 'text'})
      .subscribe(response => {
        this.todosService.setAuthToken(response.toString());
        this.todosService.setClientAuthenticated(true);
      });
  }

  logout() {
    this.todosService.isAuthenticated = false;
    this.todosService.setAuthToken(null);
  }
}

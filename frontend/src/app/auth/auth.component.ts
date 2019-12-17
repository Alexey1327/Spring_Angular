import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosService} from "../service/todos.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private cookieValue: string;

  authForm: FormGroup;
  errorMsg: string;

  constructor(private todosService: TodosService, private formBuilder: FormBuilder, private httpClient: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    this.createForm();
    this.cookieValue = this.cookieService.get('auth');
    if (this.cookieValue != '') {
      this.todosService.setAuthToken(this.cookieValue);
      this.todosService.isAuthenticated = true;
    }
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
        this.cookieService.set('auth', response.toString());
        this.errorMsg = null;
      },
        () => {
          this.errorMsg = 'Ошибка авторизации (неверный пароль)';
        }
      );
  }

  logout() {
    this.todosService.isAuthenticated = false;
    this.todosService.setAuthToken(null);
    this.cookieService.delete('auth');
    this.cookieValue = '';
    this.authForm.reset();
  }
}

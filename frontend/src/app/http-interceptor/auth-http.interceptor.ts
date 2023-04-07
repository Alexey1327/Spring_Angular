import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TodosService} from "../service/todos.service";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(public todosService: TodosService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.todosService.isAuthenticated) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this.todosService.getAuthToken())
      });
    }

    return next.handle(request).pipe(
      tap(event => {
      }), catchError((err: any) => {
        console.log('auth failed!');
        this.cookieService.delete('auth');
        this.todosService.setAuthToken(null);
        this.todosService.isAuthenticated = false;
        throw err;
      })
    );
  }
}

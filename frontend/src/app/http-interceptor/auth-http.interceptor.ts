import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TodosService} from "../service/todos.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private todosService: TodosService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.todosService.isAuthenticated) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this.todosService.getAuthToken())
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          if (event.status == 401) {
            this.todosService.isAuthenticated = false;
          }
        }
      })
    );
  }
}

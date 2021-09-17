import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private noti:NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          event = event.clone({body: this.modifyBody(event.body)});
      }
      return event;
  }));
  }

  private modifyBody(body:any) {
    let msg = '';

    switch (body['status']) {
      case 'error':
        setTimeout(() => {
          this.noti.error('Servidor no encontrado');
        }, 500);
        break;

      case 'warning':
        for (const key in body['message']) {
          if (Object.prototype.hasOwnProperty.call(body['message'], key)) {
            const element = body['message'][key];
            for (const key_2 in element) {
              if (Object.prototype.hasOwnProperty.call(element, key_2)) {
                const element_2 = element[key_2];
                this.noti.error(element_2);
              }
            }
          }
        }
        break;
    }

    return body;
  }
}

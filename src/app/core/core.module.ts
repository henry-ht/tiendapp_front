import { ErrorInterceptor } from './intercectors/error.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './pipes/date.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './intercectors/request.interceptor';
import { ResponseInterceptor } from './intercectors/response.interceptor';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    DatePipe,
    OrderByPipe,
    SearchPipe,
  ],
  exports: [
    DatePipe,
    OrderByPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }

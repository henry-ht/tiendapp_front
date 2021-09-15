import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
    dayjs.extend(relativeTime);
  }

  fromNow(date:string):string {
    return dayjs(date).fromNow();
  }

  format(date:string, format:string):string{
    return dayjs(date).format(format);
  }

  getDayjs(){
    return dayjs;
  }
}

import { DateService } from '../services/date.service';
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  constructor(private date:DateService) { }

  transform(value: string, ...args: any[]): string {
    let final = "";
    switch (args[0]) {
      case 'fromNow':
        final = this.date.fromNow(value);
        break;

      case 'format':
          final = this.date.format(value, args[1]);
          break;

      default:
        final = value;
        break;
    }
    return final;
  }

}

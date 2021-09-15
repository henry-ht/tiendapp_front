import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly notifier: NotifierService) { }

  public success(msj:string) {
    this.notifier.notify('success', msj);
  }

  public warning(msj:string) {
    this.notifier.notify('warning', msj);
  }

  public info(msj:string) {
    this.notifier.notify('info', msj);
  }

  public error(msj:string) {
    this.notifier.notify('error', msj);
  }

  public hide(){
    this.notifier.hideNewest();
  }
}

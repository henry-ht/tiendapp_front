import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private local:LocalStorageService, private session:SessionStorageService) { }

  setInLocal(KEY:string, value:string, expired:number = 0) {
    this.local.set(KEY, value, expired, 's');
  }

  removeLocal(KEY:string) {
    this.local.remove(KEY);
  }

  getInLocal(KEY:string):string {
    return this.local.get(KEY);
  }

  clearLocal() {
    this.local.clear();
  }
}

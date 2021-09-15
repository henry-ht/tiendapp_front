import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl = environment.url;
  constructor(private request:HttpClient) { }

  get(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.get(urlFinal, { params: data});
  }

  save(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.post(urlFinal, data);
  }

  put(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.put(urlFinal, data);
  }

  delete(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.delete(urlFinal, data);
  }

}

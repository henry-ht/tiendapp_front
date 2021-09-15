
import { RequestsService } from '../../core/services/request.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  products:any = [];
  page: number = 1;
  loadPage:boolean = false;
  constructor(private http:RequestsService) { }

  ngOnInit(): void {
    this.getProduts();
  }

  getProduts(){
    this.http.get("product", {page: this.page})
    .subscribe((data:any)=>{
      this.products = data.data;
    });
  }

  pageChange($event:any){
    this.page = $event;
    this.getProduts();
  }

}

import { NotificationService } from './../../core/services/notification.service';

import { RequestsService } from '../../core/services/request.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCheck, faPlus, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faBan = faBan;
  faCheck = faCheck;
  faPlus = faPlus;
  faSort = faSort;
  products:any = [];
  brands:any = [];
  page: number = 1;
  loadPage:boolean = false;
  closeResult = '';
  productForm:FormGroup;
  modalReference: any;
  textSearch:string = '';
  orderBy:boolean = true;
  constructor(private http:RequestsService, private modalService: NgbModal, private fb: FormBuilder, private noti:NotificationService) {
    this.productForm = this.fb.group({
      id: ['', []],
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
      brand_id: ['', [
        Validators.required
      ]],
      boarding: ['', [
        Validators.required
      ]],
      existence: ['', [
        Validators.required
      ]],
      size: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]]
    });
  }

  getBrands(){
    this.http.get("brand", {page: this.page})
    .subscribe((data:any)=>{
      this.brands = data.data;
    });
  }

  isValid() {
    return this.productForm.controls;
  }

  open(content:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.getProduts();
    this.getBrands();
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

  save(){
    this.loadPage = true;
    this.http.save("product", this.productForm.value)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getProduts();
        this.clearForm();
        this.noti.success(data.message['message'][0]);
        this.modalReference.close();
      }
      this.loadPage = false;
    });
  }

  onSubmit(){
    if(!this.productForm.invalid){
      if(this.productForm.controls['id'].value){
        this.edit();
      }else{
        this.save();
      }
    }
  }

  edit(){
    this.loadPage = true;
    let send = this.productForm.value;
    this.http.put("product/"+send.id, send)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getProduts();
        this.clearForm();
        this.noti.success(data.message['message'][0]);
        this.modalReference.close();
      }
      this.loadPage = false;
    });
  }

  delete(id:number, name:string){
    Swal.fire({
      title: 'Esta acción no se puede revertir!',
      text: "Eliminar a: "+name,
      showDenyButton: true,
      confirmButtonText: 'Si, eliminar',
      denyButtonText: `No, olvidalo`,
    }).then((result) => {

      if(!result.dismiss){
        this.loadPage = true;
      }

      if (result.isConfirmed) {
        this.http.delete("product/"+id)
        .subscribe((data:any)=>{
          if(data.status == "success"){
            this.getProduts();
            Swal.fire('Producto eliminado', '', 'success');
          }
          this.loadPage = false;
        });

      } else if (result.isDenied) {
        Swal.fire('Acción no realizada', '', 'info');
        this.loadPage = false;
      }
    })
  }

  disabled(id:number, status:boolean){
    this.loadPage = true;
    this.http.put("product/"+id, {disabled: (status ? 0:1) })
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getProduts();
      }
      this.loadPage = false;
    });
  }

  addToEdit(data:any){
    this.productForm.patchValue(data);
  }

  clearForm(){
    this.productForm.reset();
  }

}

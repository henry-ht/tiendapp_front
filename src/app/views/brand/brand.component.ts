import { NotificationService } from './../../core/services/notification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCheck, faPlus, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RequestsService } from 'src/app/core/services/request.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands:any = [];
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faBan = faBan;
  faCheck = faCheck;
  faSort = faSort;
  page: number = 1;
  loadPage:boolean = false;
  closeResult = '';
  brandForm:FormGroup;
  modalReference: any;
  textSearch:string = '';
  orderBy:boolean = true;
  total:number = 10;
  constructor(private http:RequestsService, private modalService: NgbModal, private fb: FormBuilder, private noti:NotificationService) {
    this.brandForm = this.fb.group({
      id: ['', []],
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
      reference: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]]
    });
  }

  isValid() {
    return this.brandForm.controls;
  }

  open(content:any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

    this.modalReference
    .result.then((result:any) => {
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
    this.getBrands();
  }

  getBrands(){
    this.http.get("brand", {page: this.page, total: 10})
    .subscribe((data:any)=>{
      this.brands = data.data;
    });
  }

  pageChange($event:any){
    this.page = $event;
    this.getBrands();
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
        this.http.delete("brand/"+id)
        .subscribe((data:any)=>{
          if(data.status == "success"){
            this.getBrands();
            Swal.fire('Marca eliminada', '', 'success');
          }
          this.loadPage = false;
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        this.loadPage = false;
      }
    });
  }

  disabled(id:number, status:boolean){
    this.loadPage = true;
    this.http.put("brand/"+id, {disabled: (status ? 0:1) })
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getBrands();
      }
      this.loadPage = false;
    });
  }

  onSubmit(){
    if(!this.brandForm.invalid){
      if(this.brandForm.controls['id'].value){
        this.edit();
      }else{
        this.save();
      }
    }
  }

  save(){
    this.loadPage = true;
    this.http.save("brand", this.brandForm.value)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getBrands();
        this.clearForm();
        this.noti.success(data.message['message'][0]);
        this.modalReference.close();
      }
      this.loadPage = false;
    });
  }

  edit(){
    this.loadPage = true;
    let send = this.brandForm.value;
    this.http.put("brand/"+send.id, send)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getBrands();
        this.clearForm();
        this.noti.success(data.message['message'][0]);
        this.modalReference.close();
      }
      this.loadPage = false;
    });
  }

  addToEdit(data:any){
    this.brandForm.patchValue(data);
  }

  clearForm(){
    this.brandForm.reset();
  }

}

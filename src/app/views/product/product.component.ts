
import { RequestsService } from '../../core/services/request.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';
  faPlus = faPlus;
  constructor(private http:RequestsService, private modalService: NgbModal) { }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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
        Swal.fire('Saved!', '', 'success');
        this.loadPage = false;
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        this.loadPage = false;
      }
    })
  }

}

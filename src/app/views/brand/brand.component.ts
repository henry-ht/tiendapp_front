import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RequestsService } from 'src/app/core/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands:any = {};
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faBan = faBan;
  faCheck = faCheck;
  page: number = 1;
  loadPage:boolean = false;
  closeResult = '';
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
    this.getBrands();
  }

  getBrands(){
    this.http.get("brand", {page: this.page})
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

}

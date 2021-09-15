import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ProductComponent,
    BrandComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewModule { }

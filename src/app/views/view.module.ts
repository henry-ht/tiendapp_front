import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ViewRoutingModule } from './view-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AppLayoutComponent,
    NavBarComponent,
    FooterComponent,
    ProductComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    NgbModule,
    NgxPaginationModule,
    CoreModule,
    FontAwesomeModule
  ],
  exports: [
    CoreModule,
    FontAwesomeModule,
  ]
})
export class ViewModule { }

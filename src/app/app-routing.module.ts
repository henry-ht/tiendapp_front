import { BrandComponent } from './views/brand/brand.component';
import { ProductComponent } from './views/product/product.component';
import { AppLayoutComponent } from './views/shared/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const MAIN = '/product';

const routes: Routes = [
  {
    path: '',
    redirectTo: MAIN,
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/view.module').then(i => i.ViewModule),
  },
  {
    path: '**',
    redirectTo: MAIN,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

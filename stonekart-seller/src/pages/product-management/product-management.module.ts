import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductManagementPage } from './product-management';

@NgModule({
  declarations: [
    ProductManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductManagementPage),
  ],
  exports: [
    ProductManagementPage
  ]
})
export class ProductManagementPageModule {}

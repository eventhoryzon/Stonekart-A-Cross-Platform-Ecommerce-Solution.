import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddproductPage } from './addproduct';

@NgModule({
  declarations: [
    AddproductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddproductPage),
  ],
  exports: [
    AddproductPage
  ]
})
export class AddproductPageModule {}

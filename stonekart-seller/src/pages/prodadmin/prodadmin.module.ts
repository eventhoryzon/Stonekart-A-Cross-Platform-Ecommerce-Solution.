import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdadminPage } from './prodadmin';

@NgModule({
  declarations: [
    ProdadminPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdadminPage),
  ],
  exports: [
    ProdadminPage
  ]
})
export class ProdadminPageModule {}

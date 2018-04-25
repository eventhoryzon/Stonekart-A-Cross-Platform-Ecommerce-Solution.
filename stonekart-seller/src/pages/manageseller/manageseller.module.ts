import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagesellerPage } from './manageseller';

@NgModule({
  declarations: [
    ManagesellerPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagesellerPage),
  ],
  exports: [
    ManagesellerPage
  ]
})
export class ManagesellerPageModule {}

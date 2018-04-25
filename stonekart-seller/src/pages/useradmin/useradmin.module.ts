import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UseradminPage } from './useradmin';

@NgModule({
  declarations: [
    UseradminPage,
  ],
  imports: [
    IonicPageModule.forChild(UseradminPage),
  ],
  exports: [
    UseradminPage
  ]
})
export class UseradminPageModule {}

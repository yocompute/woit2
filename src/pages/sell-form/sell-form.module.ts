import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellFormPage } from './sell-form';

@NgModule({
  declarations: [
    SellFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SellFormPage),
  ],
  exports: [
    SellFormPage
  ]
})
export class SellFormPageModule {}

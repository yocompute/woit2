import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellItemPage } from './sell-item';

@NgModule({
  declarations: [
    SellItemPage,
  ],
  imports: [
    IonicPageModule.forChild(SellItemPage),
  ],
  exports: [
    SellItemPage
  ]
})
export class SellItemPageModule {}

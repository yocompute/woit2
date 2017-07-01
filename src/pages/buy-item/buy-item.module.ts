import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyItemPage } from './buy-item';

@NgModule({
  declarations: [
    BuyItemPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyItemPage),
  ],
  exports: [
    BuyItemPage
  ]
})
export class BuyItemPageModule {}

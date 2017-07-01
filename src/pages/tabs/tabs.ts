import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AddItemPage } from '../add-item/add-item';
import { SellItemPage } from '../sell-item/sell-item';
import { BuyItemPage } from '../buy-item/buy-item';

import { ItemListPage } from '../item-list/item-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //set the root pages for each tab
  tab1Root: any = AddItemPage;
  tab2Root: any = ItemListPage;
  tab3Root: any = SellItemPage;
  tab4Root: any = BuyItemPage;
  tab5Root: any = AboutPage;


  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}

import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
//import { SchedulePage } from '../schedule/schedule';
//import { SpeakerListPage } from '../speaker-list/speaker-list';
import { AddItemPage } from '../add-item/add-item';
import { ItemListPage } from '../item-list/item-list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  //tab1Root: any = SchedulePage;
  //tab2Root: any = SpeakerListPage;
  tab1Root: any = AddItemPage;
  tab2Root: any = ItemListPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}

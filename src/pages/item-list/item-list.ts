import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  //@ViewChild('scheduleList', { read: List }) scheduleList: List;
  photos: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData) {
    this.confData.getPhotos().subscribe((data: any) => {
      this.photos = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

}

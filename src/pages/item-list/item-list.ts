import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { TruncatePipe } from '../../pipes/truncate';
//import { ConferenceData } from '../../providers/conference-data';

import { Config } from '../../config';

@IonicPage()
@Component({
  providers:[ItemService],
  //declarations:[TruncatePipe],
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListPage {
  photos: any = [];
  url: string;
  constructor( private itemServ: ItemService, private cfg: Config) {
    let self = this;
    this.url = this.cfg.API_URL + 'media/';
    this.itemServ.getItems().subscribe((data:Item[])=> self.photos = self.toGridData(data));
  }

  toGridData(items:Item[]){
      let nCols = 5;
      let nFullRows = Math.floor(items.length / nCols);
      let nRemainCols = items.length % nCols;
      let rows:Item[][] = [];
      let start:number = 0;
      for(var i=0; i<nFullRows; i++){
        start = i * nCols;
        rows.push(items.slice(start, start + nCols));
      }

      if(nRemainCols>0)
        rows.push(items.slice(items.length-nRemainCols, items.length));

      return rows;
  }
}

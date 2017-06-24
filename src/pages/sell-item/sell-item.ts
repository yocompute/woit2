import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  providers:[AuthService, ItemService],
  selector: 'page-sell-item',
  templateUrl: 'sell-item.html',
})
export class SellItemPage {
  photos: any = [];
  url: string;

  constructor( private authServ:AuthService, private itemServ: ItemService) {
    let self = this;
    this.url = this.itemServ.getMediaRoot();

    // Get photos under owner name
    self.authServ.getUser().then( function(user:User){
      if(user){
        self.itemServ.getItems().subscribe((data:Item[])=> self.photos = self.toGridData(data));
      }else{
        self.photos = self.toGridData([]);
      }
    });
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@IonicPage()
@Component({
  providers:[ItemService],
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListPage {
  photos: any = [];
  url: string;
  constructor( private itemServ: ItemService) {
    let self = this;
    this.url = this.itemServ.getMediaRoot();
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

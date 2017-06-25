import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

/**
 * Generated class for the SellFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  providers:[ItemService],
  selector: 'page-sell-form',
  templateUrl: 'sell-form.html',
})
export class SellFormPage {

	item:Item;
	photo:any = {src:""};

	constructor(public navCtrl: NavController, public navParams: NavParams, private itemServ:ItemService) {
		navParams.data.item.n_copies = 1;
		this.item = navParams.data.item;
		this.photo.src = this.itemServ.getMediaRoot() + this.item.fpath;
	}

  ionViewDidLoad() {
	console.log('ionViewDidLoad SellFormPage');
  }

  submit(){
  	var a = 0;
  }
}

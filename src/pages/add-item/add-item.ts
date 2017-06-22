import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Config } from '../../config';
import { User } from '../../models/user';
import { Item } from '../../models/item';

import { ItemService } from '../../services/item.service';
/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  providers: [ItemService],
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  item:Item = new Item();
  photo: any = {'src': ''};
  file: File;

  //public navCtrl: NavController, public navParams: NavParams,
  constructor( private http:Http, private cfg:Config, private storage: Storage, private itemService: ItemService) {
      // fields.title, fields.description, fields.code, fields.dimension, fields.author,
      // fields.type, fields.source, fields.n_copies, fields.fpath, fields.created, fields.updated, fields.owner
      
      var img = new Image();
      //-----------------------------------------------------------------------------------------------------
      // This event will be triggered by 2 cases, when assign img.src:
      //    1. select the item
      //    2. open file dialog and select
      // Load image by selecting from file dialog, Change image array after add new image from file dialog
      //-----------------------------------------------------------------------------------------------------
      let self = this;
      img.onload = function(){
        self.photo.src = img.src;
      }

      this.storage.get('user' + this.cfg.APP).then(function(v){
        if(v){
          let user:User = new User(v.username, v.email, '', v.id);
          self.item.owner = user;
        }

      });
      
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  // upload(src_fpath:string, dst_fname:string ):Promise<FileUploadResult>{
  //     const url = this.cfg.API_URL + 'upload';
  //     const ft: TransferObject = this.transfer.create();
  //     let opts: FileUploadOptions = {
  //        fileKey: 'file',     // name of the form element
  //        fileName: 'name.jpg', // file name on the server
  //        //headers: {}
  //     }
  //     //let fpath = "";
  //     let endpoint = encodeURI(url);
  //     return ft.upload(src_fpath, endpoint, opts);//.then().catch();
  // }

  fileChange(event:any) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
          if (file) {
            let reader = new FileReader();
            let self = this;
            reader.onload = function (e:any) {
              self.photo.src = e.target.result;
            }
            reader.readAsDataURL(file);
            this.file = file;
        }    
      }
    }

    uploadItem($event:any){
      var item = this.item;
      item.fpath = this.file? (item.owner.username + '/' + this.file.name) : 'sample.png';
      item.updated = new Date().toLocaleDateString();
      this.itemService.saveItem(this.file, item);
    }
}

import { Injectable, Component } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { MainService } from './main.service';
import { Config } from '../config';
import { Item } from '../models/item';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//@Component({
//   providers: [MainService]
// })
@Injectable()
export class ItemService {

  constructor(private http:Http, private cfg:Config, private mainServ:MainService) {}

  getMediaRoot(){
    return this.cfg.API_URL + 'media/';
  }

  getItems(query?:any):Observable<Item[]>{
    // query --- json object, eg. {owner_id: 1}
    const url = this.cfg.API_URL + 'items' + this.mainServ.toQueryStr(query);
    let self = this;
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
  	return this.http.get(url, options)
  		.map(res => self.extractData(res, self))
  		.catch(self.errorHandler);
  }

  toItem(fields:any):Item{
    return new Item(fields.title, fields.description, fields.code, fields.dimension, fields.author, fields.year,
      fields.type, fields.source, fields.style, fields.price, fields.currency,
      fields.n_copies, fields.fpath, fields.created, fields.updated, fields.owner);
  }

  extractData(res: Response, self: ItemService) {
    let d = res.json();
    let a :Item[] = [];
    if(d.items){
      let items = JSON.parse(d.items);
      for(var i=0; i<items.length; i++){
        let fields = items[i].fields;
        a.push(self.toItem(fields));
      }
    }
    return a;
  }
  
  errorHandler(error:any){
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

  // without progress bar but have json return error message
  saveItem(file: File, item: Item): Observable<any>{
    let formData:FormData = new FormData();
        formData.append('title', item.title);
        formData.append('description', item.description);
        formData.append('code', item.code);
        formData.append('dimension', item.dimension);
        formData.append('author', item.author);
        formData.append('year', item.year);
        formData.append('type', 'photo');//item.type);
        formData.append('source', item.source);
        formData.append('style', item.style);
        formData.append('price', item.price.toString());
        formData.append('currency', item.currency);
        formData.append('n_copies', item.n_copies.toString());
        formData.append('fpath', item.fpath); // <username>/<file name>
        formData.append('created', item.created);
        formData.append('updated', item.updated);
        formData.append('owner_id', item.owner.id);      
        formData.append('file', file, file.name);

        // Django
        // Note: that request.FILES will only contain data if the request method was POST and the <form> that posted the request
        // has the attribute enctype="multipart/form-data". Otherwise, request.FILES will be empty.
        const url = this.cfg.API_URL + 'upload';

        return this.http.post(url, formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
  }

  // with progress bar, without json error message
  saveItemV2(file: File, item: Item, progressCb:any, completeCb:any){
    let formData:FormData = new FormData();
        formData.append('title', item.title);
        formData.append('description', item.description);
        formData.append('code', item.code);
        formData.append('dimension', item.dimension);
        formData.append('author', item.author);
        formData.append('year', item.year);
        formData.append('type', 'photo');//item.type);
        formData.append('source', item.source);
        formData.append('style', item.style);
        formData.append('price', item.price.toString());
        formData.append('currency', item.currency);
        formData.append('n_copies', item.n_copies.toString());
        formData.append('fpath', item.fpath); // <username>/<file name>
        formData.append('created', item.created);
        formData.append('updated', item.updated);
        formData.append('owner_id', item.owner.id);      
        formData.append('file', file, file.name);

        // Django
        // Note: that request.FILES will only contain data if the request method was POST and the <form> that posted the request
        // has the attribute enctype="multipart/form-data". Otherwise, request.FILES will be empty.
        const url = this.cfg.API_URL + 'upload';

        var oReq = new XMLHttpRequest();

        oReq.upload.addEventListener("progress", function(e:any){
          var done = e.position || e.loaded;
          var total = e.totalSize || e.total;
          var v = Math.ceil(done/total) * 100;
          if(progressCb){
            progressCb(v);
          }
        }, false);
        oReq.upload.addEventListener("load", function(e:any){
          if(completeCb){
            completeCb();
          }
        }, false);
        oReq.upload.addEventListener("error", function(e:any){
          console.log("transferFailed");
        }, false);
        oReq.upload.addEventListener("abort", function(e:any){
          console.log("transferCanceled");
        }, false);

        oReq.open("post", url, true);
        oReq.send(formData);
  }

}
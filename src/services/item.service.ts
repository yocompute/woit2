import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Config } from '../config';
import { Item } from '../models/item';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http:Http, private cfg:Config) {}

  getItems():Observable<Item[]>{
    const url = this.cfg.API_URL + 'items';
    let self = this;
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
  	return this.http.get(url, options)
  		.map(self.extractData)
  		.catch(self.errorHandler);
  }

  toItem(e:any):Item{
    let fields = e.fields;
    return new Item(fields.title, fields.code, fields.description, fields.price);
  }

  extractData(res: Response) {
    let d = res.json();
    let self = this;
    let a :Item[] = [];
    if(d.items){
      let items = JSON.parse(d.items);
      for(var i=0; i<items.length; i++){
        let fields = items[i].fields;
        a.push(new Item(fields.title, fields.code, fields.description, fields.price));
      }
    }
    return a;
  }
  
  errorHandler(error:any){
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}
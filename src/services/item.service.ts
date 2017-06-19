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

  toItem(fields:any):Item{
    return new Item(fields.title, fields.description, fields.code, fields.dimension, fields.author,
      fields.type, fields.source, fields.n_copies, fields.fpath, fields.created, fields.updated, fields.owner);
  }

  extractData(res: Response) {
    let d = res.json();
    let self = this;
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

  saveItem(file: File, item: Item): Observable<any>{
    let formData:FormData = new FormData();
        formData.append('title', item.title);
        formData.append('description', item.description);
        formData.append('code', item.code);
        formData.append('dimension', item.dimension);
        formData.append('author', item.author);
        formData.append('type', item.type);
        formData.append('source', item.source);
        formData.append('price', item.price.toString());
        formData.append('n_copies', item.n_copies.toString());
        formData.append('fpath', item.fpath);
        formData.append('created', item.created);
        formData.append('updated', item.updated);
        formData.append('owner_id', item.owner.id);      
        formData.append('picture', file, file.name);

        // Django
        // Note: that request.FILES will only contain data if the request method was POST and the <form> that posted the request
        // has the attribute enctype="multipart/form-data". Otherwise, request.FILES will be empty.
        const url = this.cfg.API_URL + 'upload';

        return this.http.post(url, formData)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
  }


}
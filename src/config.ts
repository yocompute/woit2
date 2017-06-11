import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	private ENV = 'local';
	public APP = 'woit';
	public API_URL:string;
	public GUEST = {username:'guest', email:'guest@yocompute.com'};

  	constructor() {
	  	if(this.ENV=='production'){
	  		this.API_URL = 'http://www.yocomput.com:8000/api/';
	  	}else{
	  		this.API_URL = 'http://localhost:8000/';
	  	}
  	}
}
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Config } from '../config';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  
  constructor(private http:Http, private cfg:Config, private storage: Storage) {}

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get('user' + this.cfg.APP).then((v:any) =>{
      return v? true : false;
    });
  };

  hasSeenTutorial(): Promise<string> {
    return this.storage.get('tutorial' + this.cfg.APP).then((value) => {
      return value;
    });
  };

  getUsername(): Promise<string> {
    return this.storage.get('user' + this.cfg.APP).then((v:any) =>{
      return v.username;
    });
  };

  login(account: string, password: string): Observable<User> {
    const url = this.cfg.API_URL + 'login';
    let headers = new Headers({ 'Content-Type': "application/json"});
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',//});
    //   //'HTTP_X_CSRFTOKEN':'Jv0qxuTSJdWJHpyRQuNhans7hu86ode0g1nbpx8VNMa3PeaO6a086qrajQQLaXz5',
    //   'X-CSRFToken':'Jv0qxuTSJdWJHpyRQuNhans7hu86ode0g1nbpx8VNMa3PeaO6a086qrajQQLaXz5',
    //   'Access-Control-Allow-Origin': '*' });
    let self = this;
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, {"account":account, "password": password}, options)//,'csrfmiddleware‌​token':'CSRF-TOKEN-V‌​ALUE'})
                    .map(rsp => self.toUser(rsp, self.cfg, self.storage))
                    .catch(self.errorHandler);
  }

  logout(): void {

  };

  signup(username: string, email: string, password: string): Observable<User> {
    const url = this.cfg.API_URL + 'signup';
    var creds = {"username":username, "email": email, "password": password};
    let self = this;
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, creds, options)
                    .map(rsp => self.toUser(rsp, self.cfg, self.storage))
                    .catch(self.errorHandler);
  }

  setLoggedIn(user: User): void {

    this.storage.set('user'+ this.cfg.APP, user);
    //sessionStorage.setItem(this.HAS_LOGGED_IN, 'true');
    //sessionStorage.setItem('username', user.username);
    //this.events.publish('user:login');
  };

  setLogout(): void {
    this.storage.remove('user'+ this.cfg.APP);
    //this.events.publish('user:logout');
  };

  resetPassword( email:string ): Observable<string>{
    const url = this.cfg.API_URL + 'resetPassword';
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {"email":email}, options)
                    .map(rsp => rsp.json())
                    .catch(err => err);
  }
  
  toUser(rsp:Response, cfg: Config, storage: Storage){
      var d = rsp.json();
      if(d.users){
        storage.set('token'+ cfg.APP, d.token);
        var data = JSON.parse(d.users)[0];
        var id = data.pk;
        var fields = data.fields;
        return new User(fields.username, fields.email, "", id);
      }else{
        return null;
      }
  }

  errorHandler(error:any){
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
  // createUser(body:User):Observable<User>{
  //   //let csrfToken = this.getCookie('csrftoken');
  // 	//let s = body.toPostJsonStr(csrfToken);
  //   let s = JSON.stringify(body);
  //   let headers = new Headers({ 'Content-Type': 'application/json'});//, 'X-CSRFToken':csrfToken });
  // 	let options = new RequestOptions({ 'headers': headers });

	 //  //this.http.post(this.url, s).map(this.extractData).catch(this.handleError);
  //   return this.http.post(this.url, s, options).map(res => res.json());
  // }

  // private getCookie(name: string) {
  //       let ca: Array<string> = document.cookie.split(';');
  //       let caLen: number = ca.length;
  //       let cookieName = name + "=";
  //       let c: string;

  //       for (let i: number = 0; i < caLen; i += 1) {
  //           c = ca[i].replace(/^\s\+/g, "");
  //           if (c.indexOf(cookieName) == 0) {
  //               return c.substring(cookieName.length, c.length);
  //           }
  //       }
  //       return "";
  //   }

// private getCookie(name:string) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }



  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body;
  // }
  
  // private handleError2 (error: Response | any) {
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private API_URL = 'http://localhost:8000';
  //private user = new User("","","");
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  APP = 'woit';

  constructor(private http:Http) {}

  //------------------------------------------------
  // http.get return an RxJS Observable
  // getUser(id:number): Promise<User>{
  //   const url = this.baseUrl + `/users/${id}`;
  //   return this.http.get(url)
  //           .toPromise()
  //           .then(this.getmy)//rsp => rsp.json().data as User)
  //           .catch(this.getUserError);
  // }

  // getmy(rsp:any): any{
  //   return rsp.json().data as User;
  // }

  // genCSRF():Observable<string>{
  //   const url = this.baseUrl + `/csrf`;
  //   return this.http.get(url)
  //              .map(function(rsp){})
  //              .catch(this.getUserError)
  // }

  toUser(rsp:Response){
      var d = rsp.json();

      sessionStorage.setItem('token-'+ this.APP, d.token);

      if(d.users){
        var fields = JSON.parse(d.users)[0].fields;
        return new User(fields.username, fields.email);
      }else{
        return new User('guest','guest@yocompute.com');
      }
  }

  errorHandler(error:any){
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

  login(account: string, password: string): Observable<User> {
    const url = this.API_URL + `/login`;
    let headers = new Headers({ 'Content-Type': "application/json"});
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',//});
    //   //'HTTP_X_CSRFTOKEN':'Jv0qxuTSJdWJHpyRQuNhans7hu86ode0g1nbpx8VNMa3PeaO6a086qrajQQLaXz5',
    //   'X-CSRFToken':'Jv0qxuTSJdWJHpyRQuNhans7hu86ode0g1nbpx8VNMa3PeaO6a086qrajQQLaXz5',
    //   'Access-Control-Allow-Origin': '*' });
    let that = this;
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, {"account":account, "password": password}, options)//,'csrfmiddleware‌​token':'CSRF-TOKEN-V‌​ALUE'})
                    .map(rsp => that.toUser(rsp))
                    .catch(err => that.errorHandler(err));
  }

  signup(username: string, email: string, password: string): Observable<User> {
    const url = this.API_URL + `/signup`;
    var creds = {"username":username, "email": email, "password": password};
    let that = this;
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, creds, options)
                    .map(rsp => that.toUser(rsp))
                    .catch(err => that.errorHandler(err));
  }

  setLoggedIn(user: User): void {
    //this.storage.set(this.HAS_LOGGED_IN, true);
    //this.storage.set('username', user.username);
    //this.events.publish('user:login');
  };

  setLogout(): void {
    //this.storage.remove(this.HAS_LOGGED_IN);
    //this.storage.remove('username');
    //this.events.publish('user:logout');
  };




  resetPassword( email:string ): Observable<string>{
    const url = this.API_URL + `/resetPassword`;
    let headers = new Headers({ 'Content-Type': "application/json"});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {"email":email}, options)
                    .map(rsp => rsp.json())
                    .catch(err => err);
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

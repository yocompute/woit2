import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

import { TabsPage } from '../tabs/tabs';
import { Observable } from 'rxjs/Observable';
@Component({
  providers: [AuthService],
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, email?:string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, private events: Events, private authServ: AuthService) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    let that = this;
    let username = this.signup.username;
    let password = this.signup.password;
    let email = this.signup.email;

    if (form.valid) {
      that.authServ.signup(username, email, password).subscribe(
        function(user){
          if(user && user.username){
            if (form.valid) {
              that.authServ.setLoggedIn(user);
              that.events.publish('user:login');
              that.navCtrl.push(TabsPage);
            }
          }else{

          }
        }, function(error){
          console.error('An error occurred', error);
          return Observable.throw(error.message || error);
        });
    }
  }

}

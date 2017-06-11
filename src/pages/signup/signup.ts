import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

import { TabsPage } from '../tabs/tabs';

@Component({
  providers: [AuthService],
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, email?:string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, private events: Events, private authService: AuthService) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    let that = this;
    let username = this.signup.username;
    let password = this.signup.password;
    let email = this.signup.email;

    if (form.valid) {
      that.authService.signup(username, email, password).subscribe(
        function(user){
          let token = sessionStorage.getItem('token-woit');
          if(token){
            if (form.valid) {
              that.authService.setLoggedIn(user);
              that.events.publish('user:login');
              that.navCtrl.push(TabsPage);
            }
          }else{

          }
        });
    }
  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Events, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  providers: [AuthService],
  selector: 'page-user',
  templateUrl: 'login.html'
})

export class LoginPage {
  login = {account: '', password:''};
  submitted = false;
  token = '';

  constructor(public navCtrl: NavController, private events: Events, private authService: AuthService) {}

  onLogin(form: NgForm) {
    this.submitted = true;
    let that = this;
    let account = this.login.account;
    let password = this.login.password;

    this.authService.login(account, password).subscribe(
        function(user){
            if(user && user.username){
              if (form.valid) {
                that.authService.setLoggedIn(user);
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

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}

import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemListPage } from '../pages/item-list/item-list';
import { SellItemPage } from '../pages/sell-item/sell-item';
import { BuyItemPage } from '../pages/buy-item/buy-item';
import { SupportPage } from '../pages/support/support';

import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { Config } from '../config';
import { AuthService } from '../services/auth.service';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  providers: [AuthService],
  templateUrl: 'app.template.html'
})

export class WoitApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Add Photo', name: 'TabsPage', component: TabsPage, tabComponent: AddItemPage, index: 0, icon: 'cloud-upload' },
    { title: 'Photos', name: 'TabsPage', component: TabsPage, tabComponent: ItemListPage, index: 1, icon: 'albums' },
    { title: 'Sell', name: 'TabsPage', component: TabsPage, tabComponent: SellItemPage, index: 2, icon: 'appstore' },
    { title: 'Buy', name: 'TabsPage', component: TabsPage, tabComponent: BuyItemPage, index: 3, icon: 'pricetag' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 4, icon: 'information-circle' }
  ];

  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  public rootPage: any;

  constructor(
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    private cfg:Config,
    private authServ: AuthService,
    public splashScreen: SplashScreen
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('tutorial' + this.cfg.APP)
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TabsPage;
        }
        this.platformReady()
      });

    // decide which menu items should be hidden by current login status stored in local storage
    this.authServ.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
    // Set the root of the nav with params if it's a tab index
        if(this.authServ.hasLoggedIn())
        {
            alert('already login')
            this.nav.getActiveChildNav().select(page.index);
        }
        else
        {
            alert('not login')
            this.nav.setRoot(LoginPage);
        }
    }
    else 
    {
        if(this.authServ.hasLoggedIn())
        {
            alert('already login')
            this.nav.setRoot(page.name, params).catch((err: any) => {
            console.log(`Didn't set nav root: ${err}`);});
        }
        else
        {
            alert('not login')
            this.nav.setRoot(LoginPage);
        }
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.authServ.setLogout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
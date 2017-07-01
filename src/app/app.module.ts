import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { WoitApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AddItemPage } from '../pages/add-item/add-item';
import { SellItemPage } from '../pages/sell-item/sell-item';
import { SellFormPage } from '../pages/sell-form/sell-form';
import { ItemListPage } from '../pages/item-list/item-list';
import { BuyItemPage } from '../pages/buy-item/buy-item';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { Config } from '../config';
import { MainService } from '../services/main.service';
import { TruncatePipe } from '../pipes/truncate';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    WoitApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    AddItemPage,
    SellItemPage,
    SellFormPage,
    BuyItemPage,
    ItemListPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    TruncatePipe,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(WoitApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: AddItemPage, name: 'AddItem', segment: 'addItem' },
        { component: SellItemPage, name: 'SellItem', segment: 'sellItem' },
        { component: SellFormPage, name: 'SellForm', segment: 'sellForm' },
        { component: BuyItemPage, name: 'BuyItem', segment: 'buyItem'},
        { component: ItemListPage, name: 'ItemList', segment: 'itemList' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot({
        name:'woit',
        driverOrder:['indexeddb','websql','sqlite']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    WoitApp,
    AboutPage,
    AccountPage,
    LoginPage,
    PopoverPage,
    AddItemPage,
    SellItemPage,
    SellFormPage,
    BuyItemPage,
    ItemListPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Config,
    MainService,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }

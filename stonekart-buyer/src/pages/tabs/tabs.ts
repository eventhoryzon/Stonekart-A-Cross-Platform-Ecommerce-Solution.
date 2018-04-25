import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { Login } from '../login/login';
import { CartPage } from '../cart/cart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab4Root: any = CartPage;
  tab5Root:any = UserPage;

  constructor(public navCtrl: NavController,public navParams: NavParams) {
    if(!localStorage.getItem("token")) {
      navCtrl.setRoot(Login);

  }
}
}

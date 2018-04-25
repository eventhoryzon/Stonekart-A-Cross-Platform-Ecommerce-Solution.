import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,App} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {Login} from '../login/login';
import {ContactPage } from '../contact/contact';
import { OrderPage } from '../order/order';
/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  


  constructor(public navCtrl: NavController,public _app: App, public authservice: AuthService, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello Userpage Page');
  }
  
 logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout!',
      message: 'Are you sure you want to logout you will delete your token.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Nothing');
          }
        },
        {
          text: 'Yes',
          handler: () => {
        this.authservice.logout();
        this._app.getRootNav().setRoot(Login);
            console.log('Wants to logout');
          }
        }
      ]
    });
    confirm.present();
  }
  myorders(){
    this.navCtrl.push(OrderPage);
  }
  clearcache() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Saved Data!',
      message: 'Are you sure you want to clear Cache !  you will be logged out of the Application',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Nothing');
          }
        },
        {
          text: 'Yes',
          handler: () => {
        this.authservice.logout();
        this._app.getRootNav().setRoot(Login);
            console.log('Wants to logout');
          }
        }
      ]
    });
    confirm.present();
  }
contactUs(){
  this.navCtrl.push(ContactPage);
}
  getinfo() {
        this.authservice.getinfo().then((data:any) => {
        if(data.success) {
            let alert = this.alertCtrl.create({
                title: "User Information",
                subTitle: data.msg,
                buttons: ['ok'],
                cssClass: "alert"
            });
            alert.present();
        }       
    })                                   
}
}